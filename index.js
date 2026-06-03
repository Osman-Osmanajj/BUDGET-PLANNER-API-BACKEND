import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import accountRoutes from './src/routes/account.routes.js';
import transactionRoutes from './src/routes/transaction.routes.js';
import budgetRoutes from './src/routes/budget.routes.js';
import savingGoalRoutes from './src/routes/savinggoal.routes.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/saving-goals', savingGoalRoutes);

app.get('/', (req, res) => {
    res.send('Budget Planing API po funksionon me sukses');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveri eshte aktivizuar ne portin: ${PORT}`);
    });
});