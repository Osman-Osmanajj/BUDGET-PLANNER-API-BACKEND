import Transaction from '../models/transaction.model.js';
import Account from '../models/account.model.js';

export const createTransaction = async (req, res) => {
    try {
        const { account, category, amount, type, description, date } = req.body;
        const userId = req.user._id;

        const accountDoc = await Account.findOne({ _id: account, user: userId });
        if (!accountDoc) {
            return res.status(404).json({ message: 'Llogaria nuk u gjet ose nuk ju takon juve!' });
        }

        const lastTransaction = await Transaction.findOne().sort({ _id: -1 });
        const nextId = lastTransaction ? lastTransaction._id + 1 : 1;

        const transaction = await Transaction.create({
            _id: nextId,
            user: userId,
            account,
            category,
            amount: Number(amount),
            type,
            description,
            date
        });

        if (type.toLowerCase() === 'income') {
            accountDoc.balance += Number(amount);
        } else if (type.toLowerCase() === 'expense') {
            accountDoc.balance -= Number(amount);
        }
        await accountDoc.save();

        res.status(201).json({
            message: 'Transaksioni u krye me sukses dhe balanca u përditësua!',
            transaction,
            newBalance: accountDoc.balance
        });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në krijimin e transaksionit!', error: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .populate('category', 'name type')
            .populate('account', 'name type')
            .sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Gabim në marrjen e transaksioneve!', error: error.message });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id })
            .populate('category', 'name type')
            .populate('account', 'name type');
        if (!transaction) return res.status(404).json({ message: 'Transaksioni nuk u gjet!' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const { account, category, amount, type, description, date } = req.body;
        const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
        if (!transaction) return res.status(404).json({ message: 'Transaksioni nuk u gjet!' });

        const oldAccountDoc = await Account.findOne({ _id: transaction.account, user: req.user._id });
        if (oldAccountDoc) {
            if (transaction.type.toLowerCase() === 'income') {
                oldAccountDoc.balance -= transaction.amount;
            } else if (transaction.type.toLowerCase() === 'expense') {
                oldAccountDoc.balance += transaction.amount;
            }
            await oldAccountDoc.save();
        }

        transaction.account = account || transaction.account;
        transaction.category = category || transaction.category;
        transaction.amount = amount !== undefined ? Number(amount) : transaction.amount;
        transaction.type = type || transaction.type;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;

        await transaction.save();

        const currentAccountDoc = await Account.findOne({ _id: transaction.account, user: req.user._id });
        if (currentAccountDoc) {
            if (transaction.type.toLowerCase() === 'income') {
                currentAccountDoc.balance += transaction.amount;
            } else if (transaction.type.toLowerCase() === 'expense') {
                currentAccountDoc.balance -= transaction.amount;
            }
            await currentAccountDoc.save();
        }

        res.status(200).json({ message: 'Transaksioni u përditësua dhe balanca u rregullua!', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!transaction) return res.status(404).json({ message: 'Transaksioni nuk u gjet!' });

        const accountDoc = await Account.findOne({ _id: transaction.account, user: req.user._id });
        if (accountDoc) {
            if (transaction.type.toLowerCase() === 'income') {
                accountDoc.balance -= transaction.amount;
            } else if (transaction.type.toLowerCase() === 'expense') {
                accountDoc.balance += transaction.amount;
            }
            await accountDoc.save();
        }

        res.status(200).json({ message: 'Transaksioni u fshi me sukses dhe balanca u kthye mbrapa!' });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};