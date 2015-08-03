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

  it('should return error saying password should be atleast 6 characters', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.chauhan@cuelogic.co.in',
      password: 'test1'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }
        
      assert.equal(400, res.status);
      done();

    });
  });

  it('should return user details', function(done) {

    var user = {
      fname: 'anil',
      lname: 'chauhan',
      email: 'anil.test11258558856665776665p45@cuelogic.co.in',
      password: '123456'
    };
  
    request(url).post('/register').send(user).end(function(err, res) {
      
      if (err) {
        throw err;
      }

      var data = JSON.parse(res.text);
      
      assert.equal(user.fname, data.fname);
      assert.equal(user.lname, data.lname);
      assert.equal(user.email, data.email);
      
      done();

    });
  });
  
}); 
    