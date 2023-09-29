const express = require('express');

const routes = express.Router();

const upload = require('../cloud/multer');

const admin_token = require('../middleware/admin.middleware');


const {
    // login data
    logindata,


    // home data
    home,

    // services data
    servicesdata,
    servicesdetails,
    addservices,
    deleteservices,
    updateservice,


    // providers data
    providerdata,
    provider,
    deleteproviderdata,
    updateprovider,


} = require('../controller/admin.controller');


// login page post data
routes.post('/logindata', logindata);


// admin home page data get
routes.get('/home',admin_token,home);


// service add post data
routes.get('/servicesdata',admin_token, servicesdata);

routes.get('/servicesdetails/:id',admin_token, servicesdetails);

routes.post('/addservices',admin_token,upload.array("image"), addservices);

routes.get('/deleteservice/:id', admin_token, deleteservices);

routes.put('/updateservice/:id', admin_token,upload.array("serviceimage"), updateservice)


// Provider show page get data
routes.get('/providerdata', admin_token, providerdata);

routes.post('/addprovider', admin_token, upload.array("frontimg"), provider);

routes.get('/deleteprovider/:id', admin_token, deleteproviderdata);

routes.put('/updateprovider/:id', admin_token, upload.array("frontimg"), updateprovider);




// Admin Logout
routes.get('/logout',(req,res)=>{

    res.cookie("jwt",'');
    res.clearCookie();
    res.json({message:"logout successfully"});
});



module.exports = routes;