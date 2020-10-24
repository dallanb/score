import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    ENV = os.getenv("FLASK_ENV")
    PROPAGATE_EXCEPTIONS = os.getenv("PROPAGATE_EXCEPTIONS")
    TESTING = os.getenv("TESTING", False)
    KAFKA_URL = os.getenv("KAFKA_URL")
    KAFKA_TOPICS = os.getenv("KAFKA_TOPICS").split(",")
    CONTEST_URL = os.getenv("CONTEST_URL")
    MONGO_URI = os.getenv("MONGO_URL")
    REDIS_CONFIG = {
        'CACHE_TYPE': 'redis',
        'CACHE_REDIS_HOST': os.getenv("CACHE_HOST"),
        'CACHE_REDIS_PORT': os.getenv("CACHE_PORT")
    }
    LOGGING_CONFIG = {
        'version': 1,
        'loggers': {
            '': {  # root logger
                'level': 'NOTSET',
                'handlers': ['info_coloured_console', 'debug_rotating_file_handler', 'error_file_handler'],
            }
        },
        'handlers': {
            'info_coloured_console': {
                'level': 'INFO',
                'class': 'logging.StreamHandler',
                'formatter': 'coloured_console',
                'stream': 'ext://sys.stdout'
            },
            'debug_rotating_file_handler': {
                'level': 'DEBUG',
                'formatter': 'debug',
                'class': 'logging.handlers.TimedRotatingFileHandler',
                'filename': 'logs/tapir.log',
                'when': 'D',
                'interval': 1,
                'backupCount': 10
            },
            'error_file_handler': {
                'level': 'WARNING',
                'formatter': 'error',
                'class': 'logging.FileHandler',
                'filename': 'logs/error.log',
                'mode': 'a',
            }
        },
        'formatters': {
            'debug': {
                'format': '%(asctime)s [%(levelname)s] %(name)s::%(module)s|%(lineno)s:: %(message)s'
            },
            'error': {
                'format': '%(asctime)s [%(levelname)s] %(name)s::%(module)s|%(lineno)s:: %(message)s'
            },
            'coloured_console': {
                '()': 'coloredlogs.ColoredFormatter',
                'format': "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
                'datefmt': '%H:%M:%S'
            },
        },
    }