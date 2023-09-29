const express = require('express');

const user = require('../model/user.model');

const userjwt = require('jsonwebtoken');

const services = require('../model/services.name.model');

const servicecart = require('../model/service.cart.model')

const path = require('path');

const fs = require('fs');
const { log } = require('console');



exports.userRegister = async (req, res, next) => {

    try {

        console.log(req.body);

        const {

            username,

            useremail,

            userpassword,

            userphone,

        } = req.body;

        if (username == null || useremail == null || userpassword == null || userphone == null) {

            res.json({ message: "Sorry! Usename, Useremail, Userpassword Is Required" });
        }
        else {

            var finds = await user.findOne({ useremail });

            // console.log(finds,"uuuuuuu");

            if (finds == null) {

                var userdata = await user.create({

                    username,

                    useremail,

                    userpassword,

                    userphone
                });

                res.json({ message: "Success! User Registered Successfully" });

            }
            else {

                res.json({ message: "Sorry! Email Already Exist!" })
            }
        }

    } catch (err) {

        console.log(err);

        res.json({ message: "Sorry! Something Went Wrong (userRegister)" })

    }
}





// login data post

exports.userLogin = async (req, res) => {


    console.log(req.body);

    const { useremail, userpassword } = req.body;

    var data = await user.findOne({ useremail });

    if (data == null) {

        console.log("Sorry! Please Register or Enter Valid Email ID");

        res.json({ message: "Sorry! Plese Register or Enter Valid Email ID" });

    }
    else {

        if (data.userpassword == userpassword) {

            var token = await userjwt.sign({ id: data.id }, process.env.key);

            res.cookie('userjwt', token, {

                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)

            });

            console.log(token);

            console.log("Success! User Login Successfully");

            res.json({ messagr: "Success! User Login Successfully", token });
        }
        else {

            console.log(req.body);

            res.json({ message: "Sorry! User Login Password Failed" });

            console.log("Sorry! Enter Valid Password");

        }
    }
}


// user service shows

exports.userServiceData = async (req, res) => {

    try {

        var serviceData = await services.find();

        res.json({ serviceData });

    } catch (err) {

        console.log(err);

    }
}



// user services cart

exports.userServicesCart = async (req, res) => {

    try {
        // console.log(req.cookies,"dfghgfg");
        var userid = await userjwt.verify(req.cookies.userjwt, process.env.key);
        // console.log(userid,"fssssss");
        // console.log(req.params,"service iddddddd");

        // var serviceCart = await services.findById(req.params.id)
        // console.log(req.user,"11111");
        var users = await user.findById(req.user.id)
        // console.log(users,"11111");
        // console.log(serviceCart);
        var service = await services.findById(req.params.id)
        // console.log(service,"service idddddddd");

        UName = users.username
        UEmail = users.useremail
        UPhone = users.userphone
        SName = service.addservices
        SDetails = service.servicedetails
        PEmail = service.provideremail


        // console.log(userId,"user idddddddd");
        var Cart = await servicecart.create({
            UName,
            UEmail,
            UPhone,
            SName,
            SDetails,
            PEmail,
        });
        if (Cart) {
            res.json({ message: "Success! Service Added Successfully" });
        }
        else{
            res.json({message:"Sorry! Service Not Added Successfully"})
        }

    } catch (err) {

        console.log(err);

    }
}

