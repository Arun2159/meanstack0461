var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config/config.json');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const app = express();
const bodyParser = require('body-parser');
// REQUEST VALIDATION POST-GET-PUT-DELETE
router.post('/get-product', product);
router.get('/get-product-list', productlist);
router.get('/get-product-details', productdetails);
router.post('/get-product-delete', productdelete);
router.post('/get-product-update', updateproduct);
async function product(req, res) {
    try{
        const product= await Product.create(req.body);
        res.status(200).json({ 'responseCode': 200, 'message': 'Add product successfully', 'data': product}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}

async function productlist(req, res) {
    try{
        const product= await Product.find({});
        res.status(200).json({ 'responseCode': 200, 'message': 'product list', 'data': product}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}

async function productdetails(req, res) {
    try{
        var productId=req.body.id;
        const product= await Product.findById(productId);
        res.status(200).json({ 'responseCode': 200, 'message': 'product details', 'data': product}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}

async function updateproduct(req, res) {
    try{
        var productId=req.body.id;
        const product= await Product.findByIdAndUpdate(productId,req.body);
        if(!product){
            return res.status(404).json({message:'can not find any product'})
        }
        res.status(200).json({ 'responseCode': 200, 'message': 'update product successfully', 'data': product}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}
async function productdelete(req, res) {
    try{
        var productId=req.body.id;
        const product= await Product.findByIdAndDelete(productId);
        res.status(200).json({ 'responseCode': 200, 'message': 'product delete successfully', 'data': product}).end();
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}

module.exports = router;