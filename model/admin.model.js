const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    adminname: {

        type: String

    },

    adminemail: {

        type: String

    },

    adminpassword: {

        type: String

    },

    adminphone: {

        type: String

    },

    img: {

        type: String

    }

});

module.exports = mongoose.model('admin', adminSchema);