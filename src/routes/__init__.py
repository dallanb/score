from .. import api
from .v1 import PingAPI
from .v1 import ScoresAPI, ScoresListAPI, ScoresContestAPI
from .v1 import ContestsAPI, ContestsListAPI
from .v1 import LogsAPI, LogsListAPI

# Ping
api.add_resource(PingAPI, '/ping', methods=['GET'])

# Scores
api.add_resource(ScoresAPI, '/scores/<uuid:uuid>', endpoint="score")
api.add_resource(ScoresListAPI, '/scores', endpoint="scores")
api.add_resource(ScoresContestAPI, '/scores/contest/<uuid:uuid>', endpoint="score_membership")

# Contests
api.add_resource(ContestsAPI, '/contests/<uuid:uuid>', endpoint="contest")
api.add_resource(ContestsListAPI, '/contests', endpoint="contests")

# Logs
api.add_resource(LogsAPI, '/logs/<uuid:uuid>', endpoint="log")
api.add_resource(LogsListAPI, '/scores/<uuid:uuid>/logs', '/logs', endpoint="logs")
