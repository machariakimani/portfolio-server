const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    icon: {
        type: String,
        default: 'Monitor' // Default lucide icon name
    },
    tags: [{
        name: String,
        icon: String, // lucide icon name
        color: String // optional tailwind color class snippet
    }]
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
