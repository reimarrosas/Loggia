import express from 'express';

import {
  createLogbooks,
  getLogbooks,
} from '../controllers/logbooks.controllers';
import { parseCreds } from '../middlewares/credentialParser.middlewares';

const router = express.Router();

router.use(parseCreds);

router.get('/', getLogbooks);

router.post('/', createLogbooks);

export default router;
