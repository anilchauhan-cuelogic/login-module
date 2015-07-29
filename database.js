var Mongoose = require('mongoose');
var Config = require('./config');

Mongoose.connect('mongodb://' + Config.database.host + '/' + Config.database.db);

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
	console.log('Yai connected to mongodb');
});

exports.Mongoose = Mongoose;
exports.db = db;