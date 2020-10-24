import logging
from .base import Base
from ..common import time_now, generate_uuid, StatusEnum


class Contest(Base):
    def __init__(self):
        Base.__init__(self)
        self.logger = logging.getLogger(__name__)
        self.collection = 'score'
        self.instance = {}

    def find(self, query, many=False):
        if many:
            return Base.find_many(self, collection=self.collection, query=query)
        else:
            return Base.find_one(self, collection=self.collection, query=query)

    def insert(self, params, many=False):
        instance = {
            'uuid': generate_uuid(),
            'ctime': time_now(),
            'mtime': None,
            'status': StatusEnum.pending,
            'contest_uuid': None,

        }
        score = self.insert_one(collection=self.collection, instance=instance)

    def handle_event(self, key, data):
        if key == 'contest_created':
            # create a score
            _ = self.create(instance={'status': 'active', 'contest_uuid': data['uuid']})
