import mongoose, { trusted } from 'mongoose';
const categorySchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    user:{
        type: Number,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: [true,'Ju lutem vendosni emrin e kategorisë'],
        trim: true,
        unique: true
    },
    type:{
        type:String,
        required: [true,'Ju lutem vendosni tipin e kategorisë'],
        enum: ['income', 'expense']
    },
    color:{
        type: String,
        default: '#000000'
    }
},{
    timestamps: true
});
categorySchema.index({user: 1, name:1},{unique : true});
const Category = mongoose.model('Category', categorySchema);
export default Category;