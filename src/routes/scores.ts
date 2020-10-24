import express from 'express';

import { ScoreController } from '../controllers';

const router = express.Router();

router.get('/', ScoreController.fetchAll);
router.get('/:uuid', ScoreController.fetch);
router.get('/contest/:uuid', ScoreController.fetchByContestUUID);

router.put('/:uuid', ScoreController.update);

export default router;
