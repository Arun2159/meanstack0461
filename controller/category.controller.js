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
router.get('/get-categorylist', categorylist);
router.post('/get-updatecategory', updatecategory);
async function createcategory(req, res) {
    try{
        const category= await Category.insert(req.body);
        res.status(200).json({ 'responseCode': 200, 'message': 'Add category successfully', 'data': category}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
async function updatecategory(req, res) {
    try{
        var categorytId=req.body._id;
        const category= await Category.update(categorytId,req.body);
        if(!category){
            return res.status(404).json({message:'can not find any category'})
        }
        res.status(200).json({ 'responseCode': 200, 'message': 'update category successfully', 'data': category}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
       
}
async function categorylist(req, res) {
    try{ 
       // var query = [{ "$match":{"parentId":""}}];
        var query =[
            {
              $match: {
                parentId: ""
              }
            },
            {
              $lookup: {
                from: "categories",
                let: { parentId: {$toString:"$_id" }},
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$parentId", "$$parentId"] }
                    }
                  },
                  {
                    $count: "totalsubcategory"
                  }
                ],
                as: "subcategoryCount"
              }
            },
            {
              $project: {
                //id: "$_id",
                name: "$name",
                parentId: "$parentId",
                totalsubcategory: {
                  $ifNull: [{ $arrayElemAt: ["$subcategoryCount.totalsubcategory", 0] }, 0]
                }
              }
            }
          ];
        query.push({ $sort: { _id: -1 } });
       // console.log(query);
        const category= await Category.getcategorylist(query);
        res.status(200).json({ 'responseCode': 200, 'message': 'category list', 'data': category}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
module.exports = router;