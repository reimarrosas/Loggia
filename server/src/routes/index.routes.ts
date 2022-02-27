import express from 'express';
import errorRoutes from './errors.routes';

const router = express.Router()

router.use(errorRoutes);

export default router;