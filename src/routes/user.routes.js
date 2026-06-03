import express from 'express';
import {registerUser, loginUser, getMe, updateMe} from '../controllers/user.controller.js';
import { protect} from '../middleware/authentication.js';
import { validateRegisterUser,validateLoginUser,validateUpdateMe } from '../middleware/validation.js';

const router = express.Router();

router.post('/register',validateRegisterUser, registerUser);
router.post('/login',validateLoginUser, loginUser);
router.get('/me', protect, getMe);
router.put('/me',protect,updateMe);


export default router;