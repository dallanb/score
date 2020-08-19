from ..common import StatusEnum
from .. import db
from .mixins import StatusMixin


class Status(db.Model, StatusMixin):
    name = db.Column(db.Enum(StatusEnum), primary_key=True, unique=True, nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


Status.register()
