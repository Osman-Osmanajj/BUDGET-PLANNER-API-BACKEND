import express from 'express';
import {protect} from '../middleware/authentication.js';
import { createBudget, getBudgets , getBudgetById, updateBudget, deleteBudget } from '../controllers/budget.controller.js';

const router = express.Router();

router.post('/',protect, createBudget);
router.get('/', protect, getBudgets);
router.get('/:id', protect, getBudgetById);
router.put('/:id', protect, updateBudget);
router.delete('/:id', protect, deleteBudget);

export default router;