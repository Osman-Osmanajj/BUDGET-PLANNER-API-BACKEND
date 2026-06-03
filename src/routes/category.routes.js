import express from 'express';
import { createCategory,deleteCategory,getCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';
import { protect } from '../middleware/authentication.js';
const router = express.Router();

router.post('/',protect, createCategory);
router.get('/',protect, getCategories);
router.get('/:id',protect,getCategoryById);
router.put('/:id',protect,updateCategory);
router.delete('/:id',protect,deleteCategory);

export default router;