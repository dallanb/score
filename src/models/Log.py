from .. import mongodb
from ..common.utils import generate_uuid, time_now


# only support a golf log right now
class Log(mongodb.Document):
    uuid = mongodb.UUIDField(binary=False, default=generate_uuid)
    ctime = mongodb.IntField(default=time_now)
    mtime = mongodb.IntField(onupdate=time_now)
    score_uuid = mongodb.UUIDField(binary=False, required=True)
    sheet = mongodb.ListField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
