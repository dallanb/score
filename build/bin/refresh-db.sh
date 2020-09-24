#!/bin/sh

docker exec -it score bash -c "python manage.py reset_db"
docker exec -it score bash -c "python manage.py init"