import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            req.user = await User.findOne({ _id: Number(decoded.id) }).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Përdoruesi i këtij token-i nuk ekziston më!' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Jo i autorizuar, token i pavlefshëm!' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Jo i autorizuar, token mungon!' });
    }
};