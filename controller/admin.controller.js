const express = require('express');

const admin = require('../model/admin.model');

const provider = require('../model/providers.details.model');

const services = require('../model/services.name.model');

const adminjwt = require('jsonwebtoken');

const path = require('path');

const fs = require('fs');





// admin login data post

exports.logindata = async (req, res) => {

    console.log(req.body);

    const { adminemail, adminpassword } = req.body

    console.log(req.body);

    var data = await admin.findOne({ adminemail });

    if (data == null) {

        console.log("Sorry! Please Register or Enter Valid Email");

        res.json({ message: "Sorry! Plese Register or Enter Valid Email" });

    }
    else {

        if (data.adminpassword == adminpassword) {

            // console.log(data, "uuuu");

            var token = await adminjwt.sign({ id: data.id }, process.env.key);

            res.cookie('adminjwt', token, {

                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)

            });

            console.log(token);

            console.log("Success! Admin Login Successfully");

            res.json({ message: "Success! Admin Login Successfully", token });

        }
        else {

            console.log(req.body);

            res.json({ message: "Sorry! Admin Login Password Failed" });

            console.log("Sorry! Admin Enter Valid Password");

        }
    }
}



exports.home = async (req, res) => {
    // try {

    //     var admindata = await admin.find();

    //     res.json({message:"admindataaaaaaaaa",admindata});

    // } catch (err) {

    //     console.log(err);

    // }
    try {
        console.log(req.headers, "ssssssss");
        var decode = await adminjwt.verify(req.headers.token, process.env.key);
        const admindata = await admin.findById(decode.id)
        res.json({ message: "admindataaaaaaaaaaaaa", admindata });
        console.log(admindata, "dfsdfffd");
    } catch (err) {
        console.log(err);
    }

}



// services data show page get

exports.servicesdata = async (req, res) => {

    try {

        var service = await services.find();

        res.json({ service });

    } catch (err) {

        console.log(err);

    }
}


// services singl data show page

exports.servicesdetails = async (req, res) => {

    try {

        var service = await services.findById(req.params.id);

        res.json({ message: "Success!", service });

    } catch (err) {

        console.log(err);

    }
}





//services add post

exports.addservices = async (req, res) => {

    console.log(req.files, "asd4fghj")

    try {

        console.log(req.body, "dddddddd");

        const {
            addservices,
            servicedetails,
            providername,
            providernumber,
            providercompanyname,
            provideremail,

        } = req.body

        var servicesimg = [];
        console.log(req.files, "sdsdsd");
        for (var i of req.files) {

            servicesimg.push('/' + i.filename);

        }
        console.log(servicesimg, "123456");

        var newcategory = await services.create({

            addservices,
            servicedetails,
            servicesimg,
            providername,
            providernumber,
            providercompanyname,
            provideremail

        });

        if (newcategory) {


            res.json({ message: "Success! Category Add Successfully", newcategory });

            console.log("Success! Category Add Successfully");

        }
        else {

            res.json({ message: "Sorry! Category Alreary Exists" });

            console.log("Sorry! Category Alreary Exists");

        }
    } catch (err) {

        console.log(err);

    }
}





// services delete data get

exports.deleteservices = async (req, res) => {
    try {

        console.log(req.params);

        var deleteServiceimg = await services.findById(req.params.id);

        console.log(deleteServiceimg, "dawerh");

        var imgpaths = deleteServiceimg.servicesimg

        console.log(imgpaths, "dasdasfge");

        imgpaths.forEach(imgpath => {

            fs.unlinkSync(path.join(__dirname, '../images/' + imgpath), () => {

                console.log("Success! Image Deleted Successfully");

                res.json({ message: "Success! Image Deleted Successfully" });

            });
        })


        var deletedata = await services.findByIdAndDelete(req.params.id);

        console.log(deletedata);

        if (deletedata) {

            res.json({ message: "Success! Service Data Deleted Successfully" });

        }
        else {

            res.json({ message: "Sorry! Service Data Not Deleted Successfully" });

        }
    } catch (err) {

        console.log(err);

    }
}





// service data update put

exports.updateservice = async (req, res) => {

    try {

        var servicedata = await services.findById(req.params.id);

        console.log(servicedata, "jdasjfg");

        if (servicedata) {

            console.log(req.files.length, "dsahjdgafgasfjgsdjfgsdjfgseju");
            if (req.files.length == 0) {
                const updatedUser = await services.findByIdAndUpdate(req.params.id, req.body);

                res.json({ message: "Success! Service Data Updated Successfully", updatedUser });
            }
            else {
                servicedata.servicesimg.forEach(async (image) => {

                    const oldImagePath = path.join(__dirname, '../images/' + image);

                    if (fs.existsSync(oldImagePath)) {

                        fs.unlinkSync(oldImagePath);

                    }

                });

                const newImagesPath = req.files.map(file => file.filename);

                const updatedUser = await services.findByIdAndUpdate(req.params.id, { ...req.body, servicesimg: newImagesPath }, { new: true });

                res.json({ message: "Success! Service Data Updated Successfully", updatedUser });

            }

        }
        else {

            res.json({ message: "Sorry! Service Data Not Updated Successfully" });
        }

    } catch (err) {

        console.log(err);

    }

}





// provider data show page get

exports.providerdata = async (req, res) => {

    try {

        var providerdata = await provider.find();

        res.json({ providerdata });

    } catch (err) {

        console.log(err);

    }
}





// provider data add post

exports.provider = async (req, res) => {

    console.log(req.files, "sdfgh");

    try {

        console.log(req.body, "bodydata:::");

        const {
            providername,
            providernumber,
            provideremailid,
            providerbod,
            provideraddress,
            businessname,
            businessdetails,
            businessnumber,
            businessemailid,
            businessgstnumber,
            businesstype,
            businesstdsdetails,
            businesspancardnumber,
            businesscategory,
            businessaddress,
            salespersonname,
            salespersonnumber,
            salespersonemailid,
            salespersonposition,
            bankname,
            bankaccountnumber,
            bankifsccode,
            bankbranchname
        } = req.body

        var img = [];

        for (var i of req.files) {

            img.push('/' + i.filename);

        }
        console.log(img);

        var providerdata = await provider.findOne({ businessname });

        if (providerdata == null) {

            var providerdata = await provider.create({

                providername,
                providernumber,
                provideremailid,
                providerbod,
                provideraddress,
                businessname,
                businessnumber,
                businessemailid,
                businessdetails,
                businessgstnumber,
                businesstype,
                businesstdsdetails,
                businesspancardnumber,
                businesscategory,
                businessaddress,
                salespersonname,
                salespersonnumber,
                salespersonemailid,
                salespersonposition,
                bankname,
                bankaccountnumber,
                bankifsccode,
                bankbranchname,
                img

            });

            res.json({ message: "Success! Provider Add Successfully", providerdata });
            console.log(providerdata, "sdsdsddsd");
        }
        else {
            res.json({ message: "Sorry! Provider Add Failed" });
        }

    } catch (err) {

        console.log(err);

    }
}





// delete provider data get


exports.deleteproviderdata = async (req, res) => {

    try {
        console.log(req.params);

        var deletedata = await provider.findById(req.params.id);

        console.log(deletedata, "asdfghjkl");

        var imgpaths = deletedata.img

        console.log(imgpaths, "sdfghgfsdfgfdsdfgh");

        imgpaths.forEach(imgpath => {

            fs.unlinkSync(path.join(__dirname, '../images/' + imgpath), () => {

                console.log("Success! Image Deleted Successfully");

            });

        });

        var deleteprovider = await provider.findByIdAndDelete(req.params.id);

        if (deleteprovider) {

            res.json({ message: "Success! Provider Data And Associated Images Deleted Successfully" });

        }
        else {

            res.json({ message: "Sorry! Provider Data Not Deleted Successfully" });
        }
    } catch (err) {

        console.log(err);
    }

}





// update provider data put

exports.updateprovider = async (req, res) => {

    log(req.body, "body:::")

    try {
        var data = await provider.findById(req.params.id);

        console.log(data, "dfghgj258");

        if (data) {

            if (req.file.length == 0) {

                const updatedUser = await provider.findByIdAndUpdate(req.params.id, { ...req.body, img: newImagesPath }, { new: true });

                res.json({ message: "Success! Provider Data Updated Successfully", updatedUser });
            }
            else {
                data.img.forEach(async (image) => {
                    const oldImagePath = path.join(__dirname, '../images/' + image);

                    if (fs.existsSync(oldImagePath)) {

                        fs.unlinkSync(oldImagePath);

                    }

                });

                const newImagesPath = req.files.map(file => '../images/' + file.filename);

                const updatedUser = await provider.findByIdAndUpdate(req.params.id, { ...req.body, img: newImagesPath }, { new: true });

                res.json({ message: "Success! Provider Data Updated Successfully", updatedUser });
            }
        }
        else {

            res.json({ message: "Sorry! Provider Data Not Updated" });
        }
    } catch (err) {

        console.log(err);

    }

}