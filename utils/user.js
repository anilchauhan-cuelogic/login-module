var User = require('../models/user').User;

module.exports = {
	saveUserDetails : saveUserDetails
};

function saveUserDetails(request, callback) {

	User.find({'email': request.payload.email}, function(err, users) {

		if (err) callback(err);

		// object of all the users
		if(users.length) {
			callback(null, "This email is already used");
			return;
		}

		var user = new User({
		        name: request.payload.fname + ' ' +request.payload.lname,
		        email: request.payload.email,
		        password: request.payload.password});

		//save model to MongoDB
		user.save(function (err) {

			if (err) callback(err);

			callback(null, "User registered successfully");

		});
	});
}