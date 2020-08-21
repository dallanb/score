import logging
from .base import Base
from ..external import Contest as ContestExternal
from ..models import Contest as ContestModel
from .score import Score
from .log import Log


class Contest(Base):
    def __init__(self):
        Base.__init__(self)
        self.logger = logging.getLogger(__name__)
        self.contest_external = ContestExternal()
        self.contest_model = ContestModel

    def find(self, **kwargs):
        return Base.find(self, model=self.contest_model, **kwargs)

    def create(self, **kwargs):
        contest = self.init(model=self.contest_model, **kwargs)
        return self.save(instance=contest)

    def handle_event(self, key, data):
        if key == 'contest_accepted':
            # create a score & log
            contest = self.contest_external.get_contest(endpoint=data['endpoint'],
                                                        params={'expand': 'sport', 'include': 'participants'})
            contest_uuid = contest['data']['contests']['uuid']
            sport_uuid = contest['data']['contests']['sport']['sport_uuid']
            contest_participants = contest['data']['contests']['participants']
            participants = [participant['user_uuid'] for participant in contest_participants]
            score = Score().create(status='active')
            _ = Log().create(score_uuid=score.uuid, sport_uuid=sport_uuid, participants=participants)
            _ = self.create(contest_uuid=contest_uuid, score=score)
