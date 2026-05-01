const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String // Optional background image for the category card
    },
    technologies: [{
        name: String,
        icon: String, // We'll store simple string names to map to React Icons on frontend
        color: String // Tailwind color classes for the icon
    }]
}, { timestamps: true });

module.exports = mongoose.model('TechStack', techStackSchema);
