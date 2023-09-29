const providerjwt = require('jsonwebtoken');

const providerSchema = require('../model/providers.details.model');

const provider_token = async (req, res, next) => {

    var token = req.headers.authorization

    if (token) {

        console.log("token successfully");

        var providerdata = await providerjwt.verify(token, process.env.key, (err, data) => {

            if (err) {

                console.log(err);

            }

            return data

        });

        if (providerdata == undefined) {

            res.json({ message: "token in valid" });

        }
        else {

            var data = await providerSchema.findById(providerdata.id);

            // console.log(data, "prprprprpr");

            if (data == null) {

                res.json({ message: "Provider data not found" });

            }
            else {

                req.provider = data
                
                next();

            }
        }
    }
    else {

        res.json({ message: "Provider login required" });

    }

}

module.exports = provider_token;