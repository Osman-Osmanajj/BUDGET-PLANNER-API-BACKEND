import mongoose from 'mongoose';

const savingGoalSchema = new mongoose.Schema({
    _id: { 
        type: Number 
    },
    user: {
        type: Number,
        ref: 'User',
        required: [true, 'Objektivi i kursimit duhet t\'i takojë një përdoruesi']
    },
    name: {
        type: String,
        required: [true, 'Ju lutem jepni një emër për objektivin (p.sh. Laptop i ri)'],
        trim: true
    },
    targetAmount: {
        type: Number,
        required: [true, 'Ju lutem jepni shumën që synoni ta arrini']
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date
    }
}, {
    timestamps: true
});

const SavingGoal = mongoose.model('SavingGoal', savingGoalSchema);
export default SavingGoal;