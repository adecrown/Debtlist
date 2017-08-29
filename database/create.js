module.exports = function(){

var User            = require('../routes/user');


var createData = function(res,name,amount,when) {

  User.findOne({ 'debtors.name' :  name }, function(err, user) {
    // if there are any errors, return the error
    if (err){
      console.log(err);
    }

    // check to see if theres already a user with that username
    if (user) {
      res.send(user);
      //console.log("username taken");
    } else {

      // if there is no user with that username
      // create the user
      var newUser            = new User();

      // set the user's local credentials
      newUser.debtors.name    = name;
      newUser.debtors.amount = amount;
      newUser.debtors.amount = when;

      // save the user
      newUser.save(function(err) {
        if (err)
        throw err;
        res.send("Added")

      });
    }

  });
}

}
