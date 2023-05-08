const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"please enter a product name"]
    },
    qunatity:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true
    }
},
  {
    timestamps:true
   }
)

const Product = mongoose.model('Product',productSchema);
module.exports=Product;