import express from 'express'; 
import { createAccount,getAccounts,getAccountById,updateAccount,deleteAccount } from '../controllers/account.controller.js';
import { protect } from '../middleware/authentication.js';
import { validateCreateAccount, validateUpdateAccount, validateIdParam } from '../middleware/validation.js';

const router = express.Router();
router.post('/', protect,validateCreateAccount, createAccount);   
router.get('/', protect, getAccounts);
router.get('/:id',protect,validateIdParam(), getAccountById);
router.put('/:id', protect, validateIdParam(), updateAccount);
router.delete('/:id', protect, validateIdParam(),deleteAccount);

export default router;
