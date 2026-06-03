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
            color,
            user:req.user._id
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
        const categories = await Category.find({user: req.user._id});
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
};
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, user: req.user._id });
        if (!category) return res.status(404).json({ message: 'Kategoria nuk u gjet!' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name, type, color } = req.body;
        const category = await Category.findOne({ _id: req.params.id, user: req.user._id });
        if (!category) return res.status(404).json({ message: 'Kategoria nuk u gjet!' });

        category.name = name || category.name;
        category.type = type || category.type;
        category.color = color || category.color;

        await category.save();
        res.status(200).json({ message: 'Kategoria u përditësua!', category });
    } catch (error) {
        res.status(500).json({ message: 'Gabim ne server', error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!category) return res.status(404).json({ message: 'Kategoria nuk u gjet!' });
        res.status(200).json({ message: 'Kategoria u fshi me sukses!' });
    } catch (error) {
        res.status(500).json({ message: 'Gabim në server', error: error.message });
    }
};
