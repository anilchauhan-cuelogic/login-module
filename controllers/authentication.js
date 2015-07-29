var Joi = require('joi');  
var User = require('../models/user').User;

exports.register = {
    validate: {
        payload: {
            fname: Joi.string().min(3).max(25).required(),
            lname: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {

        //create new model
        var user = new User({
            name: request.payload.fname + ' ' +request.payload.lname,
            email: request.payload.email,
            password: request.payload.password});

        //save model to MongoDB
        user.save(function (err) {
            if (err) {
                return err;
            }
            else {
                reply("User registered successfully");
            }
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
                        reply(user);
                        return;
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