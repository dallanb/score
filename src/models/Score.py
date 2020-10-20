from .. import db
from .mixins import BaseMixin
from ..common import StatusEnum
from sqlalchemy_utils import UUIDType


class Score(db.Model, BaseMixin):
    # FK
    status = db.Column(db.Enum(StatusEnum), db.ForeignKey('status.name'), nullable=False)
    contest_uuid = db.Column(UUIDType(binary=False), db.ForeignKey('contest.uuid'), nullable=True)

    # Relationship
    score_status = db.relationship("Status")
    contest = db.relationship("Contest", back_populates="score")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


Score.register()
