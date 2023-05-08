const jwt = require("jsonwebtoken");
var config = require('../config/config.json');

const verifyToken = (req, res, next) => {
    try {
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearer= bearerHeader.split(" ");
      const token = bearer[1];
      req.token= token;
      const decoded = jwt.verify(req.token, config.JWT_SECRET);
      return next();
    }else{
        res.status(200).json({ 'status': false,'responseCode': 200, 'message': 'Token is not valid','token':''}).end();
       return;
    }
   }catch (error) {
    return res.status(200).json({ 'status': false,'responseCode': 201, 'message': error,'token':''}).end();
    
 }
};
  
  module.exports = verifyToken;