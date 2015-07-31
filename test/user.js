var assert = require('assert');
var request = require('supertest');

describe('register', function() {

  var url = 'http://localhost:8000';
  
    
  it('should return error saying fname cannot be empty', function(done) {

    var user = {
      fname: '',
      lname: 'chauhan',
      email: 'anil.chauhancue@logic.o.in',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }
    
      assert.equal(400, res.status);
      done();

    });
  });

  it('should return error saying fname should be atleast 3 characters long', function(done) {

    var user = {
      fname: 'aa',
      lname: 'chauhan',
      email: 'anil.chauhancue@logic.o.in',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      //console.log(res);
      if (err) {
        throw err;
      }
    
      assert.equal(400, res.status);
      done();

    });
  });

  it('should return error saying email must be a valid email', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'testemail',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }
    
      assert.equal(400, res.status);
      done();

    });
  });

  it('should return error saying password is not allowed to be empty', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.chauhan@cuelogic.co.in',
      password: ''
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }
        
      assert.equal(400, res.status);
      done();

    });
  });

  it('should return error saying email is already in use', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.chauhan@cuelogic.co.in',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }
        
      assert.equal('This email is already used', res.text);
      done();

    });
  });

  it('should return user registered successfully', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.test2@cuelogic.co.in',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }
      
      assert.equal('User registered successfully', res.text);
      done();

    });
  });
  
}); 
    