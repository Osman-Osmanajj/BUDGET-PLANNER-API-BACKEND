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
        const totalUsers = await User.countDocuments();
        const nextId = totalUsers + 1;
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