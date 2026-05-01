const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
