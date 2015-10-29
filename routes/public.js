'use strict';

var express = require('express');

//globals
var router = express.Router();

//routes
router.get('/', function(req, res) {
    res.render('home', {
        title: 'Welcome'
    });
});

module.exports = router;