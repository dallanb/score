from marshmallow import Schema, post_dump
from webargs import fields

from ..logs.schema import DumpLogSchema


class DumpScoreSchema(Schema):
    uuid = fields.UUID()
    ctime = fields.Integer()
    mtime = fields.Integer()
    contest_uuid = fields.UUID()
    status = fields.String()
    log = fields.Nested(DumpLogSchema)

class FetchScoreSchema(Schema):
    include = fields.DelimitedList(fields.String(), required=False, missing=[])


class FetchAllScoreSchema(Schema):
    page = fields.Int(required=False, missing=1)
    per_page = fields.Int(required=False, missing=10)
    include = fields.DelimitedList(fields.String(), required=False, missing=[])


dump_schema = DumpScoreSchema()
dump_many_schema = DumpScoreSchema(many=True)
fetch_schema = FetchScoreSchema()
fetch_all_schema = FetchAllScoreSchema()
