var Mongoose = require('../database').Mongoose;

bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

//create the schema
var userSchema = new Mongoose.Schema({  
	name:      {    type: String,   required: true },
    email:     {    type: String,   required: true, index: { unique: true } },
    password:  {    type: String,   required: true },
    authToken:  {    type: String,   required: false, default: null },
    creationDate: { type: Date,     required: true, default: Date.now },
});

// on every save, add the date
userSchema.pre('save', function(next) {

	var user = this;

  	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

});

userSchema.methods.comparePassword = function(password, callback) {

    bcrypt.compare(password, this.password, function(err, isMatch) {

        if (err) return callback(err);
        
        callback(null, isMatch);
    });
};

//create the model
var User = Mongoose.model('User', userSchema);

exports.User = User;