const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        required: true,
    }
}, {
    timestamps: true,
})

const Project = mongoose.model('projects', projectSchema);

module.exports = Project;