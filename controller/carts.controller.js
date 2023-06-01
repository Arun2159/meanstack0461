var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config/config.json');
var router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const app = express();
const bodyParser = require('body-parser');
// REQUEST VALIDATION POST-GET-PUT-DELETE
router.post('/create-cart', addcart);
router.get('/get-cartlist', cartlist);
async function addcart(req, res) {
    try{
        var queryes = { 'productId': req.body.productId };
        Cart.getcartDetails(queryes).then(function (result) {
            console.log('result---',result.productId);
            if(result.productId){
                let currentcart=result.productQuantity;
                let totalcartquantity= (currentcart*1) + (req.body.productQuantity*1);
                var quantityUpdate = {
                    "userId": req.body.userId,
                    "productId": req.body.productId,
                    "productQuantity": totalcartquantity,
                    "phone": req.body.status
                };
             var cartId=result._id;
             console.log('result cartId---',cartId);
             console.log('result quantityUpdate---',quantityUpdate);
             const cart=  Cart.update(cartId,quantityUpdate);
             if(!cart){
                return res.status(404).json({message:'can not find any cart Id'})
            }else{
                res.status(200).json({ 'responseCode': 200, 'message': 'Update cart successfully', 'data': quantityUpdate}).end();
            }
            }else{
              const cart= Cart.insert(req.body);
            res.status(200).json({ 'responseCode': 200, 'message': 'Add cart successfully', 'data': cart}).end();
            }

       }).catch(function (err) {
        res.status(500).json({ message: error.message })
       });
        
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
       }
}

async function cartlist(req, res) {
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