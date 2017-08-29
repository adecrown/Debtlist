
/*
* GET users listing.
*/

/*exports.list = function(req, res){
res.send("respond with a resource");
};*/


// load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  debtors            : {
    name     : String,
    amount     : String,
    paid      :String,
    when     : String,
    contact     : String,
    email     : String,
  },
});

//userSchema.index({fields: 'text'});
userSchema.index({'$**': 'text'});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
