const userjwt = require('jsonwebtoken');

const userSchema = require('../model/user.model');

const user_token = async (req, res, next) => {

    var token = req.headers.authorization

    if(token) {

        console.log("token Successfully");

        var userdata = await userjwt.verify(token, process.env.key,(err,data)=>{

            if(err){

                console.log(err);

            }

            return data
        
        });

        if(userdata == undefined) {
            
            res.json({message:"Token in Valid"});

        }
        else {

            var data = await userSchema.findById(userdata.id);

            // console.log(data,"ususususus");

            if(data == null) {

                res.json({message:"User data not found"});

            }
            else{
                req.user =data
                next();

            }
        }
    }
    else{

        res.json({message:"User login require"});

    }

}

module.exports = user_token;