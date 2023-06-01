const mongoose = require('mongoose');
const Q = require("q");
const cartSchema = mongoose.Schema(
{
	"userId": { type: String },
	"productId": { type: String },
	"productQuantity": { type: String },
	"status": { type: Number },
	"addedon": { type: Number, default:  Math.floor(Date.now() / 1000) },
},{timestamps:true }
)

const Cart = mongoose.model('Cart',cartSchema);
module.exports=Cart;

var helperMethod = {};
//Model functions create by arun
helperMethod.insert = insert;
helperMethod.update = update;
helperMethod.Cartlist = getCartlist;
helperMethod.getcartDetails = getcartDetails;
module.exports = helperMethod;

function insert(query) {
    var deferred = Q.defer();
    Cart.create(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (_err) {
        deferred.reject(_err);
    });
    return deferred.promise;
}
function update(cartId,data) {
    var deferred = Q.defer();
    Cart.findByIdAndUpdate(cartId,data).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (_err) {
        deferred.reject(_err);
    });
    return deferred.promise;
}

function getCartlist(query) {
    var deferred = Q.defer();
    Cart.aggregate(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}


function getcartDetails(query) {
    var deferred = Q.defer();
    Cart.findOne(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
