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

    bussinessname:{
        type:String
    },

    bussinessnumber:{
        type:Number
    },

    bussinessemailid:{
        type:String
    },

    bussinesswebsiteurl:{
        type:String
    },

    bussinessgstnumber:{
        type:String
    },

    bussinesstype:{
        type:String
    },

    bussinessdetails:{
        type:String
    },

    bussinesstdsdetails:{
        type:String
    },

    bussinesspancardnumber:{
        type:String
    },

    bussinesscategory:{
        type:String
    },

    bussinessaddress:{
        type:String
    },
    
    collaborationdetails:{
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