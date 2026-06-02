import express from 'express'; 
import { createAccount,getAccounts } from '../controllers/account.controller.js';
import { protect } from '../middleware/authentication.js';

const router = express.Router();
router.post('/', protect, createAccount);   
router.get('/:userId', protect, getAccounts);
export default router;
