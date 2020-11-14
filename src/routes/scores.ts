import express from 'express';

import { ScoreController } from '../controllers';

const router = express.Router();

router.get('/', ScoreController.fetchAll);
router.get('/:uuid', ScoreController.fetch);
router.get('/contest/:uuid', ScoreController.fetchByContestUUID);
// router.get('/contest/:uuid/sheets', ScoreController.fetchAllSheetByContestUUID);
// router.get('/contest/:uuid/sheets/:sheetUUID', ScoreController.fetchSheetByContestUUID);
router.get('/contest/:uuid/sheets/me', ScoreController.fetchMySheetByContestUUID);

router.put('/:uuid', ScoreController.update);
router.put('/sheets/:uuid', ScoreController.updateSheet);
router.put('/sheets/:uuid/holes/:holeId', ScoreController.updateHole);

export default router;
