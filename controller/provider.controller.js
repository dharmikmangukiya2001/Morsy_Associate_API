const express = require('express');

const provider = require('../model/providers.details.model');

const servicecart = require("../model/service.cart.model");

const services = require('../model/services.name.model');

const user = require('../model/user.model');

const providerjwt = require('jsonwebtoken');

const path = require('path');

const fs = require('fs');





// Provider login data post

exports.logindata = async (req, res) => {

    console.log(req.body, "djkisdsj");

    const { provideremailid, providerpassword } = req.body;

    console.log(req.body, "Provider logindataaaaaaaaaa");

    var data = await provider.findOne({ provideremailid });

    // console.log(data, "111111");

    if (data == null) {

        console.log("Sorry! Please Register or Enter Valid Email");

        res.json({ message: "Sorry! Please register or Enter Valid Email" });

    }
    else {

        if (data.providernumber == providerpassword) {

            // console.log(data, "uuusususu");

            var token = await providerjwt.sign({ id: data.id }, process.env.key);

            res.cookie('providerjwt', token, {

                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)

            });

            console.log(token);

            console.log("Success! Login Successfully");

            res.json({ message: "Success! Provider Login Successfully", token });
        }
        else {

            console.log(req.body, "000000000000000000000000000");

            res.json({ message: "Sorry! Provider Login Password Falied" });

            console.log("Sorry! Enter Valid Password");
        }
    }
}



// user service order show provider panel 

exports.userOrderShow = async (req, res) => {

    try {

        var Order = await servicecart.find()

        // res.json(Order)
        console.log(req.provider,"ssssss");

        var data = await servicecart.find({ PEmail:req.provider.provideremailid })
        // res.json(data)

        if(data){
            res.json({message:"Success! Today Your Order",data})
        }
        else{
            res.json({message:"Sorry! Order Not Found"})
        }
    } catch (err) {

        console.log(err);
        

    }


}