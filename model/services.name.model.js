const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
    addservices: {
        type: String
    },
    servicedetails:{
        type:String
    },
    providernumber:{
        type:String
    },
    providercompanyname:{
        type:String
    },
    providername:{
        type:String
    },
    provideremail:{
        type:String
    },

    servicesimg:{
        type:Array
    },
    userid:{
        type:String
    }
});

module.exports = mongoose.model('service', ServiceSchema);