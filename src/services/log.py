import logging
from .base import Base
from ..models import Log as LogModel


class Log(Base):
    def __init__(self):
        Base.__init__(self)
        self.logger = logging.getLogger(__name__)
        self.log_model = LogModel

    def find(self, **kwargs):
        return Base.find_mongo(self, model=self.log_model, **kwargs)

    def create(self, **kwargs):
        log = self.init_mongo(model=self.log_model, **kwargs)
        _ = self.notify(
            topic='scores',
            value=self.event.generate_endpoint(
                topic='scores',
                value=log.score_uuid
            ),
            key='log_created'
        )
        return self.save_mongo(instance=log)
