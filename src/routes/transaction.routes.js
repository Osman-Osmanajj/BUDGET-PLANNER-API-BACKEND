import express from 'express';
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from '../controllers/transaction.controller.js';
import {protect} from '../middleware/authentication.js';
const router = express.Router();

router.post('/',protect, createTransaction);
router.get('/',protect, getTransactions);
router.get('/:id',protect,getTransactionById);
router.put('/:id',protect,updateTransaction);
router.delete('/:id',protect,deleteTransaction);


export default router;