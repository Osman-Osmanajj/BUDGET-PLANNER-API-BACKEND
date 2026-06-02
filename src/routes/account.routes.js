import express from 'express'; 
import { createAccount,getAccounts,getAccountById,updateAccount,deleteAccount } from '../controllers/account.controller.js';
import { protect } from '../middleware/authentication.js';

const router = express.Router();
router.post('/', protect, createAccount);   
router.get('/', protect, getAccounts);
router.get('/:id',protect, getAccountById);
router.put('/:id', protect, updateAccount);
router.delete('/:id', protect, deleteAccount);

export default router;
