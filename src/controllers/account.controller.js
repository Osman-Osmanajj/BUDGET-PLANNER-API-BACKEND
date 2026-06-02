import Account from '../models/account.model.js';
export const createAccount = async (req,res) => {
    try{
        const {user,name,type,balance} = req.body;
        const accountExists = await Account.findOne({ user, name });
        if(accountExists){
            return res.status(400).json({ message: 'Llogaria me kete emer ekziston per kete perdorues!' });
        }
        const account = await Account.create({user,name,type,balance});
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
        const accounts = await Account.find({ user: req.params.userId });
        res.status(200).json(accounts);
    }catch (error) {
        res.status(500).json({ message: 'Gabim në marrjen e llogarive!', error: error.message });
    }   
};