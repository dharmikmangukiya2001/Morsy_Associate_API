const express = require('express');

const path = require('path');

const port = process.env.port || 8000

const cookie = require('cookie');

const cookieparser = require('cookie-parser');

const app=express();

const bodyParser = require('body-parser');

app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'images')))

const morgan = require('morgan');

require('./config/db');

require('dotenv').config();

app.use(cookieparser());

app.use(morgan('dev'));

const cors=require('cors');

app.use(cors());

app.use(express.urlencoded({extended: true}));


app.use('/admin',require('./routes/admin.routes'));

app.use('/provider',require('./routes/provider.routes'));

app.use('/user',require('./routes/user.routes'));

app.get('/', async(req,res)=>{
    res.send("<div style=text-align:center;><h1 style=color:#dd373c;>Welcome To Morsy Associate</h1><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><strong style=font-size:100px><span style=color:#017d1e;>Server Is On</span></strong><br> <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>&copy; Copyright <strong style=font-size:25px><span style=color:#006cb5;>Sky Digital</span></strong>. All Rights Reserved</div>");
})

app.listen(port,(err)=>{

    if(err){

        console.log(err);

    }

    console.log('app is running your port',port);

}); 