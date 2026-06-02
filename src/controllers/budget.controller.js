import Budget from '../models/budget.model.js';
export const createBudget = async (req, res) => {
    try {
        const { user, category, amount, startDate, endDate } = req.body;
        const totalBudgets = await Budget.countDocuments();
        const nextId = totalBudgets + 1;

        const budget = await Budget.create({
            _id: nextId,
            user,
            category,
            amount,
            startDate,
            endDate
        });

        res.status(201).json({
            message: 'Buxheti u caktua me sukses!',
            budget
        });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: Number(req.params.userId) })
            .populate('category', 'name type'); 
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};