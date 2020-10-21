from .. import mongodb
from ..common.utils import generate_uuid, time_now


class Score(mongodb.DynamicDocument):
    uuid = mongodb.UUIDField(binary=False, default=generate_uuid)
    ctime = mongodb.IntField(default=time_now)
    mtime = mongodb.IntField(onupdate=time_now)
    contest_uuid = mongodb.UUIDField(binary=False, required=True)
    status = mongodb.StringField(required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
