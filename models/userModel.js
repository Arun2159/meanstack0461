const mongoose = require('mongoose');
const Q = require("q");
const userSchema = mongoose.Schema(
{
    "fname": { type: String },
    "lname": { type: String },
    "email": { type: String },
    "phone": { type: String },
    "city": { type: String },
    "company": { type: String },
    "status": { type: Number },
	"addedon": { type: Number, default:  Math.floor(Date.now() / 1000) },
},{timestamps:true }
)

const User = mongoose.model('User',userSchema);
module.exports=User;

var helperMethod = {};
//Model functions
helperMethod.insert = insert;
helperMethod.getUserByEmail = getUserByEmail;
helperMethod.getuserDetails = getuserDetails;
module.exports = helperMethod;

function insert(query) {
    var deferred = Q.defer();
    User.create(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (_err) {
        deferred.reject(_err);
    });
    return deferred.promise;
}
function getUserByEmail(userEmail) {
    var deferred = Q.defer();
    var query = { 'email': userEmail };
    User.findOne(query).then(function (user) {
        deferred.resolve(user);
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}
function getuserDetails(query) {
    var deferred = Q.defer();
    User.findOne(query).then(function (_data) {
        deferred.resolve(_data);
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
}