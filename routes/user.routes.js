const express = require('express');

const routes = express.Router();

const upload = require('../cloud/multer');

const user_token = require('../middleware/user.middleware');


const {
    // user register
    userRegister,


    // user login
    userLogin,


    // user all services
    userServiceData,
    userServicesCart

} = require('../controller/user.controller');

// user registerdata post
routes.post('/register',userRegister);


// user logindata post 
routes.post('/logindata',userLogin);


//user show service data get
routes.get('/allservices',user_token,userServiceData);
routes.get('/servicescart/:id',user_token,userServicesCart);


module.exports = routes;