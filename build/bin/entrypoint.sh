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


manage run -h 0.0.0.0