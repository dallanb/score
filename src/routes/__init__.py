from .. import api
from .v1 import PingAPI
from .v1 import ScoresAPI, ScoresListAPI

# Ping
api.add_resource(PingAPI, '/ping', methods=['GET'])

# Scores
api.add_resource(ScoresAPI, '/scores/<uuid:uuid>', endpoint="score")
api.add_resource(ScoresListAPI, '/scores', endpoint="scores")
