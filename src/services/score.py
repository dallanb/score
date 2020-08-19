import logging
from .base import Base
from ..models import Score as ScoreModel


class Score(Base):
    def __init__(self):
        Base.__init__(self)
        self.logger = logging.getLogger(__name__)
        self.score_model = ScoreModel

    def find(self, **kwargs):
        return Base.find(self, model=self.score_model, **kwargs)

    def create(self, **kwargs):
        score = self.init(model=self.score_model, **kwargs)
        return self.save(instance=score)
