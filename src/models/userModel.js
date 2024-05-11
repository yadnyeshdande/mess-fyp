import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'], // true,
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please add a username'], // true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter a valid email'], // true,
    },
    password: {
        type: String,
        required: [true, 'Enter a valid password'],
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {type: String},
    forgotPasswordTokenExpires: {type: Date},
    verifyToken: {type: String},
    verifyTokenExpires: {type: Date},
    resetToken: {type: String},
    resetTokenExpires: {type: Date},
    createdAt: {
        type: Date,
        default: Date.now
    },
});


const User = mongoose.model.users || mongoose.model('users', userSchema);

export default User