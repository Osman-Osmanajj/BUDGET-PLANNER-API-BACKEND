import Transaction from '../models/transaction.model.js';
import Account from '../models/account.model.js';

export const createTransaction = async (req, res) => {
    try {
        const { user, account, category, amount, type, description, date } = req.body;


        const accountDoc = await Account.findById(account);
        if (!accountDoc) {
            return res.status(404).json({ message: 'Llogaria nuk u gjet!' });
        }
        const totalTransactions = await Transaction.countDocuments();
        const nextId = totalTransactions + 1;
        const transaction = await Transaction.create({
            _id: nextId,
            user, account, category, amount, type, description, date
        });
        if (type === 'income') {
            accountDoc.balance += Number(amount);
        } else if (type === 'expense') {
            accountDoc.balance -= Number(amount);
        }

        await accountDoc.save();

        res.status(201).json({
            message: 'Transaksioni u krye me sukses dhe balanca u përditësua!',
            transaction,
            newBalance: accountDoc.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.params.userId })
            .populate('category', 'name type')
            .populate('account', 'name type')
            .sort({ date: -1 }); 

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};