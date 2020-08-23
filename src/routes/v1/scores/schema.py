from marshmallow import validate, Schema, post_dump
from webargs import fields
from marshmallow_enum import EnumField
from ....common.enums import StatusEnum


class DumpScoreSchema(Schema):
    uuid = fields.UUID()
    ctime = fields.Integer()
    mtime = fields.Integer()
    status = EnumField(StatusEnum)

    def get_attribute(self, obj, attr, default):
        return getattr(obj, attr, default)

    @post_dump
    def make_obj(self, data, **kwargs):
        return data


class FetchAllScoreSchema(Schema):
    page = fields.Int(required=False, missing=1)
    per_page = fields.Int(required=False, missing=10)


dump_schema = DumpScoreSchema()
dump_many_schema = DumpScoreSchema(many=True)
fetch_all_schema = FetchAllScoreSchema()
