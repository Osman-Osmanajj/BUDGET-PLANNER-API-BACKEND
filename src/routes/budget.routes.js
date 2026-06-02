import express from 'express';
import { createBudget, getBudgets } from '../controllers/budget.controller.js';

const router = express.Router();

router.post('/', createBudget);
router.get('/:userId', getBudgets);

export default router;