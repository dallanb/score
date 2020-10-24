from flask import request
from flask_restful import marshal_with

from .schema import *
from ..base import Base
from ....common.response import DataResponse
from ....services import Contest


class ScoresAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.score = Contest()

    @marshal_with(DataResponse.marshallable())
    def get(self, uuid):
        scores = self.score.find(uuid=uuid)
        if not scores.total:
            self.throw_error(http_code=self.code.NOT_FOUND)
        return DataResponse(
            data={
                'scores': self.dump(
                    schema=dump_schema,
                    instance=scores.items[0],
                    params={
                        'include': data['include']
                    }
                )
            }
        )


class ScoresListAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.score = Contest()

    @marshal_with(DataResponse.marshallable())
    def get(self):
        data = self.clean(schema=fetch_all_schema, instance=request.args)
        scores = self.score.find(**data)
        return DataResponse(
            data={
                '_metadata': self.prepare_metadata(
                    total_count=scores.total,
                    page_count=len(scores.items),
                    page=data['page'],
                    per_page=data['per_page']),
                'scores': self.dump(
                    schema=dump_many_schema,
                    instance=scores.items,
                    params={
                        'include': data['include']
                    }
                )
            }
        )


class ScoresContestAPI(Base):
    def __init__(self):
        Base.__init__(self)
        self.score = Contest()

    @marshal_with(DataResponse.marshallable())
    def get(self, uuid):
        data = self.clean(schema=fetch_schema, instance=request.args)
        scores = self.score.find(contest_uuid=uuid, **data)
        if not scores.total:
            self.throw_error(http_code=self.code.NOT_FOUND)
        return DataResponse(
            data={
                'scores': self.dump(
                    schema=dump_schema,
                    instance=scores.items[0],
                    params={
                        'include': data['include']
                    }
                )
            }
        )
