import Budget from '../models/budget.model.js';
export const createBudget = async (req, res) => {
    try {
        const { category, amount, startDate, endDate } = req.body;
        const user = req.user._id;
        const budgetExists = await Budget.findOne({ user, category });
        if (budgetExists) {
            return res.status(400).json({ message: 'Ju keni vendosur tashmë një buxhet për këtë kategori!' });
        }
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
        const budgets = await Budget.find({ user: req.user._id })
            .populate('category', 'name type'); 
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};
export const getBudgetById = async (req, res) => {
    try{
        const budget = await Budget.findOne({ _id: req.params.id, user: req.user._id })
            .populate('category', 'name type');
        if (!budget) {
            return res.status(404).json({ message: 'Buxheti nuk u gjet!' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};

export const updateBudget = async (req, res) => {
    try {
        const { category, amount, startDate, endDate } = req.body;
        const budget = await Budget.findOne({ _id: req.params.id, user: req.user._id });
        if (!budget) {
            return res.status(404).json({ message: 'Buxheti nuk u gjet!' });
        }

        budget.amount = amount !== undefined ? Number(amount) : budget.amount;
        budget.startDate = startDate || budget.startDate;
        budget.endDate = endDate || budget.endDate;
        budget.category = category || budget.category;

        await budget.save();
        res.status(200).json({
            message: 'Buxheti u përditësua me sukses!',
            budget
        });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }   
};
export const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if(!budget){
            return res.status(404).json({ message: 'Buxheti nuk u gjet!' });
        }
        res.status(200).json({ message: 'Buxheti u fshi me sukses!' });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }   
};