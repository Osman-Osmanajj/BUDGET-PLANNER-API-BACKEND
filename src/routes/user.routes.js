import express from 'express';
import {registerUser, loginUser, getMe, updateMe,getUserById} from '../controllers/user.controller.js';
import { protect} from '../middleware/authentication.js';
import { validateRegisterUser, validateLoginUser, validateUpdateMe, validateIdParam } from '../middleware/validation.js';

const router = express.Router();

router.post('/register',validateRegisterUser, registerUser);
router.post('/login',validateLoginUser, loginUser);
router.get('/:id', protect, validateIdParam(), getUserById);
router.get('/me', protect, getMe);
router.put('/me',protect,updateMe);


export default router;