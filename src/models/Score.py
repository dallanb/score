from .. import db
from .mixins import BaseMixin
from ..common import StatusEnum


class Score(db.Model, BaseMixin):
    # FK
    status = db.Column(db.Enum(StatusEnum), db.ForeignKey('status.name'), nullable=False)

    # Relationship
    score_status = db.relationship("Status")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


Score.register()
