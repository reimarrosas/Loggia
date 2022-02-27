import express from 'express';
import authRoutes from './auth.routes';
import logbookRoutes from './logbooks.routes';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/logbooks', logbookRoutes);

export default router;
