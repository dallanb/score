from .v1 import LogsAPI, LogsListAPI
from .v1 import PingAPI
from .v1 import ScoresAPI, ScoresListAPI, ScoresContestAPI
# from .v1 import SheetsAPI
from .v1 import HolesAPI
from .. import api

# Ping
api.add_resource(PingAPI, '/ping', methods=['GET'])

# Scores
api.add_resource(ScoresAPI, '/scores/<uuid:uuid>', endpoint="score")
api.add_resource(ScoresListAPI, '/scores', endpoint="scores")
api.add_resource(ScoresContestAPI, '/scores/contest/<uuid:uuid>', endpoint="score_contest")

# Logs
api.add_resource(LogsAPI, '/logs/<uuid:uuid>', endpoint="log")
api.add_resource(LogsListAPI, '/scores/<uuid:uuid>/logs', '/logs', endpoint="logs")

# Sheets
# api.add_resource(SheetsAPI, '/sheets/<uuid:uuid>', endpoint="sheet")

# Holes
api.add_resource(HolesAPI, '/sheets/<uuid:uuid>/holes/<int:hole_id>', endpoint="hole")
