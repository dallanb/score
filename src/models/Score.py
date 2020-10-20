from .. import db
from .mixins import BaseMixin
from ..common import StatusEnum
from sqlalchemy_utils import UUIDType


class Score(db.Model, BaseMixin):
    # FK
    status = db.Column(db.Enum(StatusEnum), db.ForeignKey('status.name'), nullable=False)
    contest_uuid = db.Column(UUIDType(binary=False), nullable=False)

    # Relationship
    score_status = db.relationship("Status")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


Score.register()
