const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {

        type: String

    },

    useremail: {

        type: String

    },

    userpassword: {

        type: String

    },

    userphone: {

        type: String

    },

    userimg: {

        type: String

    }

});

module.exports = mongoose.model('user', userSchema);