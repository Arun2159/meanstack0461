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
router.post('/create-subcategory', createsubcategory);
router.get('/get-subcategorylist', subcategorylist);
router.post('/get-subupdatecategory', updatesubcategory);
async function createsubcategory(req, res) {
    try{
        const subcategory= await Category.insert(req.body);
        res.status(200).json({ 'responseCode': 200, 'message': 'Add Sub category successfully', 'data': subcategory}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
async function updatesubcategory(req, res) {
    try{
        var categorytId=req.body._id;
        const subcategory= await Category.update(categorytId,req.body);
        if(!subcategory){
            return res.status(404).json({message:'can not find any Sub category'})
        }
        res.status(200).json({ 'responseCode': 200, 'message': 'update Sub category successfully', 'data': subcategory}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
async function subcategorylist(req, res) {
    try{
        var query = [{ "$match":{"parentId":{"$ne": ""}}}];
        query.push({ $sort: { _id: -1 } });
       // console.log(query);
        const category= await Category.getcategorylist(query);
        res.status(200).json({ 'responseCode': 200, 'message': 'Sub category list', 'data': category}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
module.exports = router;