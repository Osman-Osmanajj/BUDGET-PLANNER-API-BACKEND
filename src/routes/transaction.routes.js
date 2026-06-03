import express from 'express';
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from '../controllers/transaction.controller.js';
import {protect} from '../middleware/authentication.js';
import { validateCreateTransaction, validateUpdateTransaction, validateIdParam } from '../middleware/validation.js';
const router = express.Router();

router.post('/',protect,validateCreateTransaction, createTransaction);
router.get('/',protect, getTransactions);
router.get('/:id',protect,validateIdParam(), getTransactionById);
router.put('/:id',protect,validateIdParam(), updateTransaction);
router.delete('/:id',protect,validateIdParam(), deleteTransaction);


export default router;