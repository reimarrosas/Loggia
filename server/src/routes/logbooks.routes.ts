import express from 'express';

import {
  createLogbooks,
  deleteLogbooks,
  getLogbooks,
  updateLogbooks,
} from '../controllers/logbooks.controllers';
import { parseCreds } from '../middlewares/credentialParser.middlewares';

const router = express.Router();

router.use(parseCreds);

router.get('/', getLogbooks);

router.post('/', createLogbooks);

router.put('/:logbookId', updateLogbooks);

router.delete('/:logbookId', deleteLogbooks);

export default router;
