var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var config = require('../config/config.json');
var router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/userModel');
const app = express();
const bodyParser = require('body-parser');
router.post('/user-signup', signup);
router.post('/user-login', login);
function signup(req, res) {
    try {
        var query = {
            "fname": req.body.fname,
            "lname": req.body.lname,
            "email": req.body.email,
            "phone": req.body.phone,
            "city": req.body.city,
            "company": req.body.company,
            "status": 1
        };
        var queryes = { 'email': req.body.email };
        user.getUserByEmail(req.body.email).then(function (result) {
            if (result) {
                res.status(200).json({ 'status': false, 'responseCode': 201, 'message': 'Email id is already exits' }).end();
            } else {
                const User = user.insert(query);
                if (User) {
                    res.status(200).json({ 'status': true, 'responseCode': 200, 'message': 'user added successfully', 'data': query }).end();
                } else {
                    res.status(200).json({ 'status': false, 'responseCode': 201, 'message': 'user not added successfully', 'data': '' }).end();
                }
            }
        }).catch(function (err) {
            res.status(500).json({ message: error.message })
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

function login(req, res) {
    try {
        var username = req.body.email;
        var password = req.body.password;
        if (username == '') {
            res.status(200).json({ 'status': false, 'responseCode': 201, 'message': 'Username is required', 'data': '' }).end(); return;
        }
        if (password == '') {
            res.status(200).json({ 'status': false, 'responseCode': 201, 'message': 'Password is required', 'data': '' }).end(); return;
        }
        var query = { 'email': username, 'phone': password };
        user.getuserDetails(query).then(function (data) {
            if (data && data._id) {
                const token = jwt.sign({ user: data }, config.JWT_SECRET, { expiresIn: config.EXPIRESTIME })
                res.status(200).json({ 'status': true, 'responseCode': 200, 'message': 'Login successfully', 'token': token, 'data': data }).end();
            } else {
                res.status(200).json({ 'status': false, 'responseCode': 201, 'message': 'Invalid Username', 'data': '' }).end();
            }
        }).catch(function (err) {
            res.status(500).json({ message: error.message })
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

module.exports = router;