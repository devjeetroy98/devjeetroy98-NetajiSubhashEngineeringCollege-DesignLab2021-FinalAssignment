const mongoose = require('mongoose');

const profilechema = new mongoose.Schema({
    profile: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
});
module.exports = new mongoose.model('profile', profilechema);