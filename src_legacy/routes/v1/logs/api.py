from flask import request
from flask_restful import marshal_with

from .schema import *
from ..base import Base
from ....common.response import DataResponse, MessageResponse
from ....services import Log, Score


class LogsAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.log = Log()

    @marshal_with(DataResponse.marshallable())
    def get(self, uuid):
        logs = self.log.find(uuid=uuid)
        if not logs.total:
            self.throw_error(http_code=self.code.NOT_FOUND)
        return DataResponse(
            data={
                'logs': self.dump(
                    schema=dump_schema,
                    instance=logs.items[0]
                )
            }
        )


class LogsListAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.log = Log()
        self.score = Score()

    @marshal_with(DataResponse.marshallable())
    def get(self):
        data = self.clean(schema=fetch_all_schema, instance=request.args)
        logs = self.log.find(**data)
        return DataResponse(
            data={
                '_metadata': self.prepare_metadata(
                    total_count=logs.total,
                    page_count=len(logs.items),
                    page=data['page'],
                    per_page=data['per_page']),
                'logs': self.dump(
                    schema=dump_many_schema,
                    instance=logs.items
                )
            }
        )

    @marshal_with(DataResponse.marshallable())
    def post(self, uuid):
        data = self.clean(schema=create_schema, instance=request.get_json())
        scores = self.score.find(uuid=uuid)
        if not scores.total:
            self.throw_error(http_code=self.code.NOT_FOUND)
        log = self.log.create(sheet=data['sheet'], score_uuid=scores.items[0].uuid)
        return DataResponse(
            data={
                'logs': self.dump(
                    schema=dump_schema,
                    instance=log
                )
            }
        )


class HolesAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.log = Log()

    @marshal_with(MessageResponse.marshallable())
    def put(self, uuid, hole_id):
        data = self.clean(schema=update_holes_schema, instance=request.get_json())

        # update the hole that matches the provided id which is nested in the the sheet that matches the provided uuid
        count = self.log.log_model.objects(
            __raw__={
                'sheet.uuid': str(uuid)
            }
        ).update_one(
            __raw__={
                '$set': {f'sheet.$.holes.{hole_id}': data}
            }
        )

        if not count:
            self.throw_error(http_code=self.code.NOT_FOUND)
        return MessageResponse()
