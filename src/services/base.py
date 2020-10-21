import logging
from ..common import Cache, Event, MongoDB
from ..common.error import ManualException


class Base:
    def __init__(self):
        self.mongodb = MongoDB()
        self.cache = Cache()
        self.event = Event()
        self.logger = logging.getLogger(__name__)

    # @cache.memoize(timeout=1000)
    def count_mongo(self, model):
        return self.mongodb.count(model=model)

    def find_mongo(self, model, **kwargs):
        return self.mongodb.find(model=model, **kwargs)

    def init_mongo(self, model, **kwargs):
        return self.mongodb.init(model=model, **kwargs)

    def save_mongo(self, instance):
        return self.mongodb.save(instance=instance)

    def destroy_mongo(self, instance):
        return self.mongodb.destroy(instance=instance)

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
