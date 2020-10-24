import express from 'express';

import { Scores } from '../controllers';

const router = express.Router();

router.get('/', Scores.fetchAll);
router.get('/:uuid', Scores.fetch);
router.get('/contest/:uuid', Scores.fetchByContestUUID);

router.put('/:uuid', Scores.update);

export default router;
