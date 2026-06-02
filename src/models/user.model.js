import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id:{
        type:Number

    },
    name:{
        type: String,
        required: [true,'Ju lutem vendosni emrin tuaj'],
        trim: true
    },
    email:{
        type : String,
        required: [true,'Ju lutem vendosni email-in tuaj'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true,'Ju lutem vendosni password-in tuaj'],
        minlength: [6,'Password-i duhet te jete se paku 6 karaktere']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});
const User = mongoose.model('User', userSchema);

export default User;