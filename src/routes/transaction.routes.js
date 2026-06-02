import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';
import {protect} from '../middleware/authentication.js';
const router = express.Router();

router.post('/',protect, createTransaction);
router.get('/',protect, getTransactions);

export default router;