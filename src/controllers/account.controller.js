import Account from '../models/account.model.js';
export const createAccount = async (req,res) => {
    try{
        const {name,type,balance} = req.body;
        const userId = req.user._id;
        const accountExists = await Account.findOne({ user: userId, name });
        if(accountExists){
            return res.status(400).json({ message: 'Llogaria me kete emer ekziston per kete perdorues!' });
        }
        const totalAccounts = await Account.countDocuments();
        const nextId = totalAccounts + 1;
        const account = await Account.create({
            _id: nextId,
            user: userId,
            name,
            type,
            balance
        });
        res.status(201).json({
            message: 'Llogaria u krijua me sukses!',
            account
        });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në krijimin e llogarisë!', error: error.message });
    }
};

export const getAccounts = async (req,res) => {
    try{
        const accounts = await Account.find({ user: req.user._id });
        res.status(200).json(accounts);
    }catch (error) {
        res.status(500).json({ message: 'Gabim në marrjen e llogarive!', error: error.message });
    }   
};