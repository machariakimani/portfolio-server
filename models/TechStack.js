const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String 
    },
    technologies: [{
        name: String,
        icon: String, 
        color: String 
    }]
}, { timestamps: true });

module.exports = mongoose.model('TechStack', techStackSchema);
