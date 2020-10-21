from flask import Flask, g
from flask_caching import Cache
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_mongoengine import MongoEngine
from flask_restful import Api, marshal_with

app = Flask(__name__)
app.config.from_object("src.config.Config")
# cache
cache = Cache(app, config=app.config['REDIS_CONFIG'])
# cors
CORS(app, supports_credentials=True)
# mongodb
mongodb = MongoEngine(app)
# ma
ma = Marshmallow()
# routes
api = Api(app)

# logging
import logging.config

logging.config.dictConfig(app.config['LOGGING_CONFIG'])

# import libs
from .lib import *

# event
producer = Producer(url=app.config['KAFKA_URL'])

from .event import new_event_listener

consumer = Consumer(url=app.config['KAFKA_URL'],
                    topics=app.config['KAFKA_TOPICS'], event_listener=new_event_listener)

# import models
from .models import *
# import routes
from .routes import *

# import common
from .common import (
    ManualException,
    ErrorResponse
)

if app.config['ENV'] != 'development':
    # error handling
    @app.errorhandler(Exception)
    @marshal_with(ErrorResponse.marshallable())
    def handle_error(error):
        return ErrorResponse(), 500


    @app.errorhandler(ManualException)
    @marshal_with(ErrorResponse.marshallable())
    def handle_manual_error(error):
        return ErrorResponse(code=error.code, msg=error.msg, err=error.err), error.code

if app.config['ENV'] != 'development':
    @app.before_first_request
    def handle_first_request():
        consumer.start()
        producer.start()


# before each request
@app.before_request
def handle_request():
    g.logger = logging
    g.cache = cache
    g.config = app.config
