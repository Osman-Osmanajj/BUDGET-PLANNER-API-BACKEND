import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    _id:{
        type: Number
    },
    user:{
        type: Number,
        ref: 'User',
        required: [true, 'Llogaria duhet ti takoje një përdoruesi']
    },
    name:{
        type: String,
        required: [true, 'Ju lutem vendosni emrin e llogarisë'],
        trim: true
    },
    type:{
        type: String,
        required: true,
        enum: ['cash', 'bank', 'credit_card','checking', 'other'],
        default: 'cash'
    },
    balance:{
        type: Number,
        required: [true, 'Ju lutem jepni balancen fillestare të llogarisë'],
        default : 0
    },
},{
    timestamps: true
});
accountSchema.index({ user: 1, name: 1 }, { unique: true });
const Account = mongoose.model('Account', accountSchema);
export default Account;