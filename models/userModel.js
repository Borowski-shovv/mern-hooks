const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    date: {
        type: Date,
        default: Date.now
    } 
}, {
    timestamps: true,
});

//pierwszy argument to nazwa kolekcji
const User = mongoose.model('users', userSchema);

module.exports = User;