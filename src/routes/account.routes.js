import express from 'express'; 
import { createAccount,getAccounts } from '../controllers/account.controller.js';

const router = express.Router();
router.post('/', createAccount);   
router.get('/:userId', getAccounts);
export default router;
