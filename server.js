//server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/',(req,res)=>{
res.send('hello jyoti node api')
})

app.listen(3000,()=>{
    console.log('node API app is running on port 3000')
})