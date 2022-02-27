import express from 'express';
import { emailVerify, login, register } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/verify/:token', emailVerify);

export default router;
