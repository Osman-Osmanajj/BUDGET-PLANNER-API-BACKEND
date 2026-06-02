import express from 'express';
import { createSavingGoal, getSavingGoals } from '../controllers/savinggoals.controller.js';
import { protect } from '../middleware/authentication.js';
const router = express.Router();

router.post('/', protect, createSavingGoal);
router.get('/', protect, getSavingGoals);

export default router;