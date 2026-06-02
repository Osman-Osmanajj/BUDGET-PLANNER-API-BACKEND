import express from 'express';
import { createSavingGoal, getSavingGoals,getSavingGoalById,updateSavingGoal,deleteSavingGoal } from '../controllers/savinggoals.controller.js';
import { protect } from '../middleware/authentication.js';
const router = express.Router();

router.post('/', protect, createSavingGoal);
router.get('/', protect, getSavingGoals);
router.get('/:id', protect, getSavingGoalById);
router.put('/:id', protect, updateSavingGoal);
router.delete('/:id', protect, deleteSavingGoal);   

export default router;