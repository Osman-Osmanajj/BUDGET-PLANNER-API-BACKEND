import express from 'express';
import {protect} from '../middleware/authentication.js';
import { createBudget, getBudgets , getBudgetById, updateBudget, deleteBudget } from '../controllers/budget.controller.js';
import { validateCreateBudget, validateUpdateBudget, validateIdParam } from '../middleware/validation.js';

const router = express.Router();

router.post('/',protect,validateCreateBudget,  createBudget);
router.get('/', protect, getBudgets);
router.get('/:id', protect, validateIdParam(), getBudgetById);
router.put('/:id', protect,  validateIdParam(),updateBudget);
router.delete('/:id', protect,  validateIdParam(),deleteBudget);

export default router;