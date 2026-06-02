import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import accountRoutes from './src/routes/account.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/accounts', accountRoutes);
app.get('/', (req, res) => {
    res.send('Budget Planing API po funksionon me sukses');
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveri eshte aktivizuar ne portin: ${PORT}`);
    });
});