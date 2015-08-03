var server = require('../index');
var sinon = require('sinon');
var request = require('supertest');
var assert = require('assert');
var userFunctions = require('../utils/user');
//var stubUserDetails, user;

// stubUserDetails.withArgs({'email': 'anil.chauhan@cuelogic.co.in'}).returns('email exists');
// stubUserDetails.withArgs({'email': 'sdfdsf.sdfs@cuelogic.co.in'}).returns('email available');

// it('should return error saying email already exist', function(done) {

// 	console.log(userFunctions.saveUserDetails({'email': 'anil.chauhan@cuelogic.co.in'}));
// 	console.log(userFunctions.saveUserDetails({'email': 'sdfdsf.sdfs@cuelogic.co.in'}));
// 	done();
// });

describe('register', function() {

  var url = 'http://localhost:8000';

 //  before(function () {

 //  	var user = {
	// 	fname: 'gdfgdsfg',
	// 	lname: 'chauhan',
	// 	email: 'anil.chauhan@cuelogic.co.in',
	// 	password: '123456'
	// };

	// stubUserDetails = sinon.stub(userFunctions, 'saveUserDetails');

 //    stubUserDetails.withArgs(user).returns('email exists');

 //  });
  
  it('should return error saying email already exist', function() {

  	var user = {
		fname: 'gdfgdsfg',
		lname: 'chauhan',
		email: 'anil.chauhan@cuelogic.co.in',
		password: '1234568'
	};

	stubUserDetails = sinon.stub(userFunctions, 'saveUserDetails');

    stubUserDetails.withArgs(user, undefined).returns('email exists');
	
    request(url).post('/register').send(user).end(function(err, res) {

    	try {
	      console.log(res);
	      
	    } catch (err) {
	      
	    }

     });
   });
});
