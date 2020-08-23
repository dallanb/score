from marshmallow import fields, Schema


class DumpContestSchema(Schema):
    uuid = fields.UUID()
    ctime = fields.Integer()
    mtime = fields.Integer()
    contest_uuid = fields.UUID()
    score_uuid = fields.UUID()


class FetchAllContestSchema(Schema):
    page = fields.Int(required=False, missing=1)
    per_page = fields.Int(required=False, missing=10)
    contest_uuid = fields.UUID(required=False)


dump_schema = DumpContestSchema()
dump_many_schema = DumpContestSchema(many=True)
fetch_all_schema = FetchAllContestSchema()
