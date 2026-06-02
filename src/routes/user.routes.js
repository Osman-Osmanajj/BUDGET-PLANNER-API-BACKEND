import express from 'express';
import {registerUser, loginUser, getMe} from '../controllers/user.controller.js';
import { protect} from '../middleware/authentication.js';

const router = express.Router();

router.post('/register',protect, registerUser);
router.post('/login', protect, loginUser);
router.get('/me', protect, getMe);

export default router;