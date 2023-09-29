const adminjwt = require('jsonwebtoken');

const adminSchema = require('../model/admin.model');

const admin_token = async (req, res, next) => {

    var token = req.headers.token
    // var token = req.headers.authorization

    if (token) {

        console.log("token successfully");

        var admindata = await adminjwt.verify(token, process.env.key, (err, data) => {

            if (err) {

                console.log(err);

            }

            return data
            
        });

        if (admindata == undefined) {

            res.json({ message: "token in valid" });

        }
        else {

            var data = await adminSchema.findById(admindata.id);

            console.log(data, "ddddddddd");

            if (data == null) {

                res.json({ message: "Admin data not found" });

            }
            else {

                next();

            }
        }
    }
    else {

        res.json({ message: "Admin login require" });

    }

}

module.exports = admin_token;