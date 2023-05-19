var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config/config.json');
var router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const app = express();
const bodyParser = require('body-parser');
// REQUEST VALIDATION POST-GET-PUT-DELETE
router.post('/create-category', createcategory);


async function createcategory(req, res) {
    try{
        const category= await Category.insert(req.body);
        res.status(200).json({ 'responseCode': 200, 'message': 'Add category successfully', 'data': category}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
module.exports = router;