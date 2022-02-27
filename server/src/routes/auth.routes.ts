import express from 'express';
import {
  emailVerify,
  login,
  loginStatus,
  logout,
  register,
} from '../controllers/auth.controllers';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/verify/:token', emailVerify);

router.get('/login-status', loginStatus);

router.get('/logout', logout);

export default router;
