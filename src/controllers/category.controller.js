import Category from '../models/category.model.js';
export const createCategory = async (req, res) => {
    try{
        const { name, type, color } = req.body;

        const categoryExists = await Category.findOne({ name });
        if(categoryExists){
            return res.status(400).json({ message: 'Kategoria me kete emer ekziston!' });
        }
        const totalCategories = await Category.countDocuments();
        const nextId = totalCategories + 1;
        const category = await Category.create({
            _id: nextId,
            name,
            type,
            color
        });
        res.status(201).json({
            message: 'Kategoria u krijua me sukses!',
            category
        });
    }catch(error){
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
};
export const getCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
}