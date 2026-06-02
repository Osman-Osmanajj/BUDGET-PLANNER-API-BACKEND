import SavingGoal from '../models/savinggoals.models.js';

export const createSavingGoal = async (req, res) => {
    try {
        const { user, name, targetAmount, currentAmount, dueDate } = req.body;
        const totalGoals = await SavingGoal.countDocuments();
        const nextId = totalGoals + 1;

        const savingGoal = await SavingGoal.create({
            _id: nextId,
            user,
            name,
            targetAmount,
            currentAmount,
            dueDate
        });

        res.status(201).json({
            message: 'Objektivi i kursimit u krijua me sukses!',
            savingGoal
        });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};
export const getSavingGoals = async (req, res) => {
    try {
        const goals = await SavingGoal.find({ user: Number(req.params.userId) });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};