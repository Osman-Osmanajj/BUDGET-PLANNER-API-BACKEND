import User from '../models/user.model.js';
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Ky email është i regjistruar paraprakisht!' });
        }
        const user = await User.create({
            name,
            email,
            password 
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