const mongoose = require('mongoose');
const ProviderSchema = new mongoose.Schema({
    

    // Personal Information
    
    providername:{
        type:String
    },

    providernumber:{
        type:Number
    },

    provideremailid:{
        type:String
    },
    providerpassword:{
        type:String
    },

    providerbod:{
        type:String
    },

    provideraddress:{
        type:String
    },


    // Business Information

    businessname:{
        type:String
    },

    businessnumber:{
        type:Number
    },

    businessemailid:{
        type:String
    },

    businessgstnumber:{
        type:String
    },

    businesstype:{
        type:String
    },

    businessdetails:{
        type:String
    },

    businesstdsdetails:{
        type:String
    },

    businesspancardnumber:{
        type:String
    },

    businesscategory:{
        type:String
    },

    businessaddress:{
        type:String
    },


    // Self Person Information

    salespersonname:{
        type:Array
    },

    salespersonnumber:{
        type:Array
    },

    salespersonemailid:{
        type:Array
    },

    salespersonposition:{
        type:Array
    },


    // Bank Information

    bankname:{
        type:String
    },

    bankaccountnumber:{
        type:String
    },

    bankifsccode:{
        type:String
    },

    bankbranchname:{
        type:String
    },


    // Upload Documents

    img:{
        type:Array
    }
    
});

module.exports = mongoose.model('provider',ProviderSchema);