import express from 'express';
import { createSavingGoal, getSavingGoals,getSavingGoalById,updateSavingGoal,deleteSavingGoal } from '../controllers/savinggoals.controller.js';
import { protect } from '../middleware/authentication.js';
import { validateCreateSavingGoal, validateUpdateSavingGoal, validateIdParam } from '../middleware/validation.js';
const router = express.Router();

router.post('/', protect, validateCreateSavingGoal, createSavingGoal);
router.get('/', protect, getSavingGoals);
router.get('/:id', protect, validateIdParam(), getSavingGoalById);
router.put('/:id', protect,  validateIdParam(),updateSavingGoal);
router.delete('/:id', protect,  validateIdParam(),deleteSavingGoal);   

export default router;