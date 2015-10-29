'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var stormpath = require('express-stormpath');

//globals
var router = express.Router();

//routes
router.get('/dashboard', function(req, res) {
    res.render('dashboard', {
        title: 'Welcome to the Dashboard'
    });
});

router.get('/profile', function(req, res) {
    req.user.getCustomData(function(err, customData){

        req.user.customData = customData;

        res.render('profile', {
            title: 'Account Profile'
        });
    });
});

router.post('/profile', function(req,res) {
    req.user.getCustomData(function(err,customData){

        if(err){
            return res.status(err.statusCode).json(err);
        }

        for (var key in req.body) {
            customData[key] = req.body[key];
        }

        customData.save(function(err){
            if(err){
                return res.status(err.statusCode).json(err);
            }

            res.render('profile', {
                title: 'Account Profile'
            });
        });
    });
});

module.exports = router;