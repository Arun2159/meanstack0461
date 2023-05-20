const mongoose = require('mongoose');
const Q = require("q");
const categorySchema = mongoose.Schema(
{
    "name": { type: String },
	"desc": { type: String },
	"parentId": { type: String },
	"imagePath": { type: String },
	"imageName": { type: String },
	"isFilterable": { type: Number },
	"sortNo": { type: String },
	"status": { type: Number },
	"isDefault": { type: Number},
	"addedon": { type: Number, default:  Math.floor(Date.now() / 1000) },
},{timestamps:true }
)

const Category = mongoose.model('Category',categorySchema);
module.exports=Category;

var helperMethod = {};
//Model functions create by arun
helperMethod.insert = insert;
helperMethod.update = update;
helperMethod.getcategorylist = getcategorylist;
module.exports = helperMethod;

function insert(query) {
    var deferred = Q.defer();
    Category.create(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (_err) {
        deferred.reject(_err);
    });
    return deferred.promise;
}
function update(categorytId,data) {
    var deferred = Q.defer();
    Category.findByIdAndUpdate(categorytId,data).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (_err) {
        deferred.reject(_err);
    });
    return deferred.promise;
}

function getcategorylist(query) {
    var deferred = Q.defer();
    Category.find().sort(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
