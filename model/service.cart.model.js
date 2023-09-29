const mongoose = require('mongoose');
const ServiceCartSchema = new mongoose.Schema({
    UName:{
        type:String
    },
    UEmail:{
        type:String
    },
    UPhone:{
        type:String
    },
    SName:{
        type:String
    },
    SDetails:{
        type:String
    },
    PEmail:{
        type:String
    },
    SImg:{
        type:Array
    }
});

module.exports = mongoose.model('servicecart', ServiceCartSchema);