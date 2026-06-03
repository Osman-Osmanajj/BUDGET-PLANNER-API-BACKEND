import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Ky email është i regjistruar paraprakisht!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const lastUser = await User.findOne().sort({ _id: -1 });
        const nextId = lastUser ? lastUser._id + 1 : 1;
        const user = await User.create({
            _id: nextId,
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'Përdoruesi u krijua me sukses!'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};
export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Email ose fjalëkalim i gabuar!'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message: 'Email ose fjalëkalim i gabuar!'});
        }
        const token = jwt.sign(
            { id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
         );

         res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: token
         });
            }catch(error){
                res.status(500).json({ message: 'Gabim në server', error: error.message });
            }
    };
export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};
export const updateMe = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({message: 'Perdoruesi nuk u gjet'});
        }

        if(email && email !== user.email){
            const emailExists = await User.findOne({email,_id: {$ne: user._id}});
            if(emailExists){
                return res.status(400).json({message: 'Ky email eshte i regjistruar me heret'});
            }
            user.email = email;
        }
        user.name = name || user.name;
        if(password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
        }
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: 'Profili u perditesua me sukses'
        });
    }catch(error){
        res.status(500).json({message: 'Gabim ne server', error:error.message});
    }
};