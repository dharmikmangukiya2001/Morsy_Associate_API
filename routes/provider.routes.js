const express = require('express');
const routes = express.Router();
const upload = require('../cloud/multer');
const provider_token = require('../middleware/provider.middleware');


const{
    // login data
    logindata,


    // user service order show provider panel 
    userOrderShow,
}= require('../controller/provider.controller');


// login page post data
routes.post('/logindata',logindata);


// user service order show provider panel 
routes.get('/userorder',provider_token,userOrderShow); 






module.exports = routes;