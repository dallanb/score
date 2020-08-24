from flask import request
from flask_restful import marshal_with
from .schema import *
from ..base import Base
from ....common.response import DataResponse
from ....services import Contest


class ContestsAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.contest = Contest()

    @marshal_with(DataResponse.marshallable())
    def get(self, uuid):
        contests = self.contest.find(uuid=uuid)
        if not contests.total:
            self.throw_error(http_code=self.code.NOT_FOUND)
        return DataResponse(
            data={
                'contests': self.dump(
                    schema=dump_schema,
                    instance=contests.items[0]
                )
            }
        )


class ContestsListAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.contest = Contest()

    @marshal_with(DataResponse.marshallable())
    def get(self):
        data = self.clean(schema=fetch_all_schema, instance=request.args)
        contests = self.contest.find(**data)
        return DataResponse(
            data={
                '_metadata': self.prepare_metadata(
                    total_count=contests.total,
                    page_count=len(contests.items),
                    page=data['page'],
                    per_page=data['per_page']),
                'contests': self.dump(
                    schema=dump_many_schema,
                    instance=contests.items
                )
            }
        )
