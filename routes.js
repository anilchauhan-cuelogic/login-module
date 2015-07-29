var Authentication = require('./controllers/authentication');

exports.endpoints = [
    { method: 'POST',   path: '/login',       config: Authentication.login },
    { method: 'POST',   path: '/register',    config: Authentication.register },
    { method: 'GET',   path: '/listuser',    config: Authentication.userList },
];

