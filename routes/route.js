var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
var config = require('../config/config.json');
const Product = require('../models/productModel');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())

/*function authenticateSecurityToken(req, res, next) {
	const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer= bearerHeader.split(" ");
      const token = bearer[1];
      req.token= token;
      next();
    }else{
        res.send({
            result:'Token is not valid'  git push -u origin main
        })
    }
}*/
router.use('/user/', require('../controller/user.controller.js'));
router.use('/product/',auth, require('../controller/product.controller.js'));
router.use('/category/',auth, require('../controller/category.controller.js'));
module.exports = router;