import express from 'express';

import { PingController } from '../controllers';

const router = express.Router();

router.get('/', PingController.index);

export default router;
