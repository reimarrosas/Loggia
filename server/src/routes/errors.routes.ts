import express from 'express';
import {
  errorHandler,
  notFoundHandler,
} from '../middlewares/error.middlewares';

const router = express.Router();

router.use(notFoundHandler);
router.use(errorHandler);

export default router;
