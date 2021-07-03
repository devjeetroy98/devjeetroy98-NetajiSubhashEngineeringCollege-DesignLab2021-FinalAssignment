const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
});
userschema.plugin(findOrCreate);
module.exports = new mongoose.model('user', userschema);