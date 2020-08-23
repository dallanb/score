#!/bin/sh

. ~/.bashrc

pip install -e .

if [ "$DATABASE" = "score" ]; then
  echo "Waiting for score..."

  while ! nc -z $SQL_HOST $SQL_PORT; do
    sleep 0.1
  done

  echo "PostgreSQL started"
fi

if [ "$MONGO_DATABASE" = "score" ]; then
  echo "Waiting for score..."

  while ! nc -z $MONGO_HOST $MONGO_PORT; do
    sleep 0.1
  done

  echo "MongoDB started"
fi


if [ ! -d "migrations/dev/versions" ]; then
  echo "Directory migrations/dev/versions does not exist."
  flask db init --directory=migrations/dev
  sed -i '/import sqlalchemy as sa/a import sqlalchemy_utils' migrations/dev/script.py.mako
  flask db migrate --directory=migrations/dev
fi

flask db upgrade --directory=migrations/dev


manage run -h 0.0.0.0