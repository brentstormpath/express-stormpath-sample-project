'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var privateRoutes = require('./routes/private');
var publicRoutes = require('./routes/public');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.locals.siteTitle = 'Express-Stormpath Sample Project';

// Initialize Stormpath Middleware
app.use(stormpath.init(app, {
    // Optional configuration options.
    website: true,
    web: {
        expand: {
            customData: true
        },
        login: {
            enabled: true,
            nextUri: '/dashboard'
        },
        forgotPassword: {
            enabled: true,
            uri: "/forgot",
            view: "forgot-password",
            nextUri: "/login?status=forgot"
        }
    }
}));

// Once Stormpath has initialized itself, start your web server!
app.on('stormpath.ready', function() {
    app.listen(3000);
});


// Routes
app.use('/', publicRoutes);
app.use('/', stormpath.loginRequired, privateRoutes);