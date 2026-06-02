import Account from '../models/account.model.js';
export const createAccount = async (req,res) => {
    try{
        const {name,type,balance} = req.body;
        const userId = req.user._id;
        const accountExists = await Account.findOne({ user: userId, name });
        if(accountExists){
            return res.status(400).json({ message: 'Llogaria me kete emer ekziston per kete perdorues!' });
        }
        const lastAccount = await Account.findOne().sort({ _id: -1 });
        const nextId = lastAccount ? lastAccount._id + 1 : 1;
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

export const getAccountById = async (req,res) =>{
    try{
        const account = await Account.findOne({_id: req.params.id,user:req.user._id});
        if(!account) return res.status(404).json({message: 'Llogaria nuk u gjet'});
        res.status(200).json(account);
    }catch(error){
        res.status(500).json({message:'Gabim ne server', error: error.message});
    }
};

export const updateAccount = async (req,res) => {
    try{
        const {name,type,balance} = req.body;
        const account = await Account.findOne({_id:req.params.id,user:req.user._id});
        if(!account) return res.status(404).json({message: 'Llogaria nuk u gjet!'});

        account.name = name || account.name;
        account.type = type || account.type;
        account.balance = balance !== undefined ? Number(balance) : account.balance;

        await account.save();
        res.status(200).json({message: 'Llogaria u perditesua!', account});
    }catch(error){
        res.status(500).json({message: 'Gabim ne server', error: error.message});
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!account) return res.status(404).json({ message: 'Llogaria nuk u gjet!' });
        res.status(200).json({ message: 'Llogaria u fshi me sukses!' });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};