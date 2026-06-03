import express from 'express';
import { createCategory,deleteCategory,getCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';
import { protect } from '../middleware/authentication.js';
import { validateCreateCategory, validateUpdateCategory, validateIdParam } from '../middleware/validation.js';
const router = express.Router();

router.post('/',protect, validateCreateCategory,createCategory);
router.get('/',protect, getCategories);
router.get('/:id',protect,validateIdParam(), getCategoryById);
router.put('/:id',protect,validateIdParam(), updateCategory);
router.delete('/:id',protect,validateIdParam(),deleteCategory);

export default router;