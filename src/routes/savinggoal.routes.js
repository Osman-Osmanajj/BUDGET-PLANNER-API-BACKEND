import express from 'express';
import { createSavingGoal, getSavingGoals } from '../controllers/savinggoals.controller.js';

const router = express.Router();

router.post('/', createSavingGoal);
router.get('/:userId', getSavingGoals);

export default router;