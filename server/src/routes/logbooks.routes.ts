import express from 'express';

import { getLogbooks } from '../controllers/logbooks.controllers';
import { parseCreds } from '../middlewares/credentialParser.middlewares';

const router = express.Router();

router.use(parseCreds);

router.get('/', getLogbooks)

export default router;
