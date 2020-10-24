import logging
from ..common import Cache, Event, MongoDB
from ..common.error import ManualException
from .. import db


class Base:
    def __init__(self):
        self.db = db
        self.cache = Cache()
        self.event = Event()
        self.logger = logging.getLogger(__name__)

    def find_one(self, collection, query):
        return self.db[collection].find_one(query)

    def find_many(self, collection, query):
        return self.db[collection].find(query)

    def insert_one(self, collection, instance):
        return self.db[collection].insert_one(instance)

    def insert_many(self, collection, instances):
        return self.db[collection].insert_many(instances)

    def delete_one(self, collection, query):
        return self.db[collection].delete_one(query)

    def delete_many(self, collection, query):
        return self.db[collection].delete_many(query)

    @classmethod
    def dump(cls, schema, instance, params=None):
        if params:
            for k, v in params.items():
                schema.context[k] = v
        return schema.dump(instance)

    @classmethod
    def clean(cls, schema, instance, **kwargs):
        return schema.load(instance, **kwargs)

    @staticmethod
    def assign_attr(instance, attr):
        for k, v in attr.items():
            instance.__setattr__(k, v)
        return instance

    def notify(self, topic, value, key):
        self.event.send(topic=topic, value=value, key=key)

    @staticmethod
    def error(code, **kwargs):
        if code is None:
            raise ManualException()
        code = code.value
        msg = kwargs.get('msg', code.phrase)
        err = kwargs.get('err', None)
        raise ManualException(code=code, msg=msg, err=err)
