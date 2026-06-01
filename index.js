import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config(); // ← Para gjithçkaje

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Budget Planing API po funksionon me sukses');
});

const PORT = process.env.PORT || 3000;

// ✅ Lidhu me DB, pastaj starto serverin
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveri eshte aktivizuar ne portin: ${PORT}`);
    });
});