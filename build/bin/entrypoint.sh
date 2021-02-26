#!/bin/sh

if [ "$MONGO_DATABASE" = "score" ]; then
  echo "Waiting for score..."

  while ! nc -z $MONGO_HOST $MONGO_PORT; do
    sleep 0.1
  done

  echo "MongoDB started"
fi

while ! nc -z $ZOOKEEPER_HOST $ZOOKEEPER_PORT; do
  sleep 0.1
done
echo "Kafka started"

npm run devStart
