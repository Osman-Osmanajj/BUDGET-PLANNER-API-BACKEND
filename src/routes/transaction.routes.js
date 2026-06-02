import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/', createTransaction);
router.get('/:userId', getTransactions);

export default router;