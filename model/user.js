const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const userSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }

});


const user = mongoose.model('users', userSchema);
module.exports = user;