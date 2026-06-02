import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    user:{
        type: Number,
        ref:'User',
        required: [true,'Buxheti duhet ti takoje nje perdoruesi']
    },
    category:{
        type:Number,
        ref:'Category',
        required:[true,'Ju lutem percaktoni kategorine per kete buxhet']
    },
    amount:{
        type:Number,
        required:[true,'Ju lutem jepni vleren maksimale te buxhetit']
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    }
},{
    timestamps:true
});

budgetSchema.index({user:1,category:1,startDate:1},{unique:true});
const Budget = mongoose.model('Budget',budgetSchema);
export default Budget;