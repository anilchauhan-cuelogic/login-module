var Joi = require('joi');  
var User = require('../models/user').User;
var jwt = require('jsonwebtoken');
var Config = require('./../config');

var userFunctions = require('../utils/user');

var privateKey = Config.key.privateKey;

exports.register = {
    validate: {
        payload: {
            fname: Joi.string().min(3).max(25).required(),
            lname: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(15).required()
        }
    },
    handler: function(request, reply) {
        
        userFunctions.saveUserDetails(request, function(err, user){

            if(err) throw err;
            reply(user);
        });
    }
}


exports.login = {  
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        },
        failAction: function (request, reply, source, error) {
            
            reply(error);
        }
    },
    handler: function (request, reply) {

        // fetch user and test password verification
        User.findOne({ email: request.payload.email }, function(err, user) {

            if (err) throw err;

            if(user){

                user.comparePassword(request.payload.password, function(err, isMatch) {

                    if (err) throw err; 

                    if(isMatch){

                        var token = jwt.sign({'userId' : user._id}, privateKey);
                        User.findOneAndUpdate({"_id": user._id}, {
                            $set: {
                                "authToken": token
                            }
                        }, function(err, user){
                            if(err) reply("Token not set");

                            delete user.password;
                            reply(user);
                        })
                        
                    } else {
                        reply("Invalid password");
                    }
                });
            } else {
                return reply("Invalid email");
            }           
        });
    }
}

exports.userList = {
    handler:function(request, reply){

        User.find({}, function(err, users) {
          if (err) throw err;

          // object of all the users
          reply(users);
        });
    }
}

// exports.getUser = {
//     auth: 'token',
//     handler: function (request, reply) {
//         return reply(request.auth.credentials);
//     }
// }