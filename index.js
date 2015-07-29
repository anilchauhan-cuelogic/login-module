var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');

// Create a server with a host and port
var server = new Hapi.Server();

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

server.route(Routes.endpoints);