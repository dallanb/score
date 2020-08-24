from marshmallow import fields, Schema


class CreateLogSchema(Schema):
    sheet = fields.List(fields.Dict(), required=True)


class DumpLogSchema(Schema):
    uuid = fields.UUID()
    ctime = fields.Integer()
    mtime = fields.Integer()
    score_uuid = fields.UUID()
    sheet = fields.List(fields.Dict())


class FetchAllLogSchema(Schema):
    page = fields.Int(required=False, missing=1)
    per_page = fields.Int(required=False, missing=10)


create_schema = CreateLogSchema()
dump_schema = DumpLogSchema()
dump_many_schema = DumpLogSchema(many=True)
fetch_all_schema = FetchAllLogSchema()
