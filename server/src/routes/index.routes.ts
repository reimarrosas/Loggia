import express from 'express';
import authRoutes from './auth.routes';
import errorRoutes from './errors.routes';

const router = express.Router()

router.use('/auth', authRoutes)
router.use(errorRoutes);

export default router;