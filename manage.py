from flask.cli import FlaskGroup

from src import app, mongodb, cache

cli = FlaskGroup(app)


def create_mongodb():
    mongodb.connection.drop_database('score')


def clear_cache():
    cache.clear()


@cli.command("reset_mongodb")
def reset_mongodb():
    create_mongodb()


@cli.command("flush_cache")
def flush_cache():
    clear_cache()


if __name__ == "__main__":
    cli()
