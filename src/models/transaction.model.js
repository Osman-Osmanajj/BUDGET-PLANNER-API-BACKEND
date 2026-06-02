import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    _id:{
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Transaksioni duhet t\'i takojë një përdoruesi']
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', 
        required: [true, 'Ju lutem përcaktoni llojin e llogarisë']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: [true, 'Ju lutem përcaktoni kategorinë']
    },
    amount: {
        type: Number,
        required: [true, 'Ju lutem jepni vlerën e transaksionit']
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'] 
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;