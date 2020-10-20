from sqlalchemy_utils import UUIDType
from .. import db
from .mixins import BaseMixin


class Contest(db.Model, BaseMixin):
    contest_uuid = db.Column(UUIDType(binary=False), nullable=False)

    # Relationship
    score = db.relationship("Score", back_populates="contest", uselist=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


Contest.register()
