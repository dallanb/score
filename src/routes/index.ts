import express from 'express';

import pingRouter from './ping';
import scoresRoutes from './scores';

const router = express.Router();

router.use('/ping', pingRouter);
router.use('/scores', scoresRoutes);

export default router;
