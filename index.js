var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');
var User = require('./models/user').User;

// Create a server with a host and port
var server = new Hapi.Server();

var privateKey = Config.key.privateKey;

server.connection({
    host: Config.server.host, 
    port: Config.server.port,
    routes: {
	    validate: {
			options: {
				abortEarly: false
			}
	    }
  	}
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

 
// var validate = function (server, callback) {

//   return {
//     authenticate : function(request,reply) {
//         console.log(request);
   
//     }
//   }
// }


// server.register(require('hapi-auth-jwt'), function (error) {

//     server.auth.strategy('token', 'jwt', {
//         key: privateKey,
//         validateFunc: validate
//     });
//     server.route(Routes.endpoints);
//  });   


server.route(Routes.endpoints);

