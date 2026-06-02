import SavingGoal from '../models/savinggoals.models.js';

export const createSavingGoal = async (req, res) => {
    try {
        const { name, targetAmount, currentAmount, dueDate } = req.body;
        const user = req.user._id;
        const totalGoals = await SavingGoal.countDocuments();
        const nextId = totalGoals + 1;

        const savingGoal = await SavingGoal.create({
            _id: nextId,
            user,
            name,
            targetAmount,
            currentAmount: currentAmount || 0,
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
        const goals = await SavingGoal.find({ user: req.user._id });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};

export const getSavingGoalById = async (req, res) => {
try{
    const goal = await SavingGoal.findOne({ _id: req.params.id, user: req.user._id });
    if(!goal){
        return res.status(404).json({message: 'Objektivi i kursimit nuk u gjet!' });
    }    
    res.status(200).json(goal);
}catch(error){
    res.status(500).json({message: 'Gabim në server', error: error.message });
    }
};
export const updateSavingGoal = async (req, res) => {
    try{
        const { name, targetAmount, currentAmount, dueDate} = req.body;
        const goal = await SavingGoal.findOne({ _id: req.params.id, user: req.user._id });
        if(!goal){
            return res.status(404).json({message: 'Objektivi i kursimit nuk u gjet!' });    
        }
    
    goal.name = name || goal.name;
    goal.targetAmount = targetAmount !== undefined ? Number(targetAmount) : goal.targetAmount;
    goal.currentAmount = currentAmount !== undefined ? Number(currentAmount) : goal.currentAmount;
    goal.dueDate = dueDate || goal.dueDate;

    await goal.save();
    res.status(200).json({
        message: 'Objektivi i kursimit u përditësua me sukses!',
        goal
    });
} catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
}
};

export const deleteSavingGoal = async (req,res) =>{
    try{
        const result = await SavingGoal.deleteOne({ _id: req.params.id, user: req.user._id });

        if(result.deletedCount === 0){
            return res.status(404).json({ message: 'Objektivi i kursimit nuk u gjet!' });
        }
        res.status(200).json({ message: 'Objektivi i kursimit u fshi me sukses!' });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
}