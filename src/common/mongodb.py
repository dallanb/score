import collections
import logging


class MongoDB:
    def __init__(self):
        pass

    @classmethod
    def _generate_pipeline(cls, model, include=[], expand=[]):
        pipeline = []
        for i, j in enumerate(include):
            lookup = {'$lookup': {
                'from': j,
                'localField': 'uuid',
                'foreignField': f'{model._get_collection_name()}_uuid',
                'as': j
            }}
            unwind = {'$unwind': f'${j}'}
            pipeline.append(lookup)
            pipeline.append(unwind)
        for i, j in enumerate(expand):
            logging.info("EXPANDED")
        return pipeline

    @classmethod
    # Methods
    def init(cls, model, **kwargs):
        return model(**kwargs)

    @classmethod
    def count(cls, model):
        return model.objects.count()

    @classmethod
    def save(cls, instance):
        instance.save()
        return instance

    @classmethod
    # TODO: Consider using dataclass instead of a named tuple
    def find(cls, model, page=None, per_page=None, include=[], expand=[], **kwargs):
        pipeline = cls._generate_pipeline(model=model, include=include, expand=expand)

        if len(pipeline):
            cursor = model.objects(**kwargs).aggregate(*pipeline)
            items = [item for item in cursor]
            total = len(items)
        else:
            items = model.objects(**kwargs)
            total = items.count()
        Find = collections.namedtuple('Find', ['items', 'total'])
        return Find(items=items, total=total)

    @classmethod
    def destroy(cls, instance):
        instance.delete()
        return True
