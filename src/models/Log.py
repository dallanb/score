from .. import mongodb
from ..common.utils import generate_uuid


class Log(mongodb.Document):
    uuid = mongodb.UUIDField(binary=False, default=generate_uuid)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
