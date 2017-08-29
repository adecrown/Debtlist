module.exports = function(app,sendmail) {

  app.get('/', function(req, res) {
    res.render('new.ejs'); // load the index.ejs file

  });



  app.get('/contact', function(req, res) {
    res.render('cont.ejs'); // load the index.ejs file

  });


  app.get('/search', function(req, res) {
    res.render('search.ejs'); // load the index.ejs file

  });




  app.post('/createD/', function(req, res) {

    var User            = require('../routes/user');
    //var db            = require('../database/create.js');


    //db.createData(res,req.body.name,req.body.amount,req.body.when)


    User.findOne({ 'debtors.name' :  req.body.name }, function(err, user) {
      // if there are any errors, return the error
      if (err){
        console.log(err);
        res.send("Contact your administrator");
      }

      // check to see if theres already a user with that username
      if (user) {
        //return "ff";
        res.send("username taken");
      } else {

        // if there is no user with that username
        // create the user
        var newUser            = new User();

        // set the user's local credentials
        newUser.debtors.name    = req.body.name;
        newUser.debtors.amount = req.body.amount;
        newUser.debtors.paid = req.body.paid;
        newUser.debtors.when = req.body.when;
        newUser.debtors.contact = req.body.conct;
        newUser.debtors.email = req.body.email;

        // save the user
        newUser.save(function(err) {
          if (err)
          throw err
          //res.send(null, newUser);
          //res.status(200).send(null, newUser);
          res.send("Added")
        });
      }

    });


  });




  app.post('/search/', function(req, res) {

    var User            = require('../routes/user');


    //var regex = new RegExp(["^", req.body.name, "$"].join(""), "i");
    var regex = new RegExp([ req.body.name].join(""), "i");
    User.find({ 'debtors.name':{ $regex: regex}}, function(err, user) {
      // if there are any errors, return the error
      if (err){
        console.log(err);
        res.send("Contact your administrator");
      }

      // check to see if theres already a user with that username
      if (user.length > 0) {
        res.send(user);
      }
      else {
        res.send("Not Found");
      }


    });


  });




  /*

  app.post('/search/', function(req, res) {

  var User            = require('../routes/user');


  var daysAgo = "2017-08-16";//req.body.ago
  //  console.log(User.schema.obj.debtors.name);
  //User.createIndex({"name":"text"})
  //User.ensureIndex({name:"text"})
  var ry = [];
  User.find({
  "$text": {
  '$search':req.body.name,
}
}, {
"debtors":-1,
//name: 1,
//amount: 1,
//_id: 10,
textScore: {
$meta: "textScore"
}
},{
sort: {
textScore: {
$meta: "textScore"
}
}
},function(err, user) {
// if there are any errors, return the error
if (err){
console.log(err);
res.send("Contact your administrator");
}

// check to see if theres already a user with that username
if (user) {
for (var i = 0; i < user.length; i++) {
ry.push(user[i]);
}

res.send(ry);
}
else {
res.send("None");
}


});


});
*/



app.post('/fundD/', function(req, res) {

  var User            = require('../routes/user');

  var daysAgo = "2017-08-16";//req.body.ago

  User.find({ 'debtors.when':daysAgo}, function(err, user) {
    // if there are any errors, return the error
    if (err){
      console.log(err);
      res.send("Contact your administrator");
    }

    // check to see if theres already a user with that username
    if (user.length > 0) {
      res.send(user);
    }
    else {
      res.send("None");
    }


  });


});




app.get('/edit', function(req, res) {
  var User            = require('../routes/user');
  User.findOne({'_id' : req.query.id}, function(err, doc) {
    console.log(doc)

    if(doc)
    {
      res.render('edit.ejs', {
        jsdatam    : doc
      });
    }else {
      res.render('edit.ejs', {
        jsdatam    : 'null'
      });
    }

  });
});



app.post('/save', function(req, res) {
  var User            = require('../routes/user');
  User.findOne({'_id' : req.body.id}, function(err, user) {

    console.log(user)
    if(user)
    {
      user.debtors.name = req.body.name;
      user.debtors.amount = req.body.amount;
      user.debtors.paid = req.body.paid;
      user.debtors.when = req.body.when;
      user.debtors.contact = req.body.conct;
      user.debtors.email = req.body.email;
      user.save(function (err) {
        if (err) {
          console.log(err);
          res.send("Something went wrong contact your administrator")
        }
        else {
          console.log(user);
          res.send("Changed")
        }
      });
    }
    else {
      res.send("Cannot find this person");
    }
  });
});



//setInterval(autocheck, 60*60*1000);//1 hour
//setInterval(autocheck, 60*60*24000);//24 hour
//setInterval(function(){autocheck(2)}, 10000);//24 hour
//autocheck(5);
function autocheck(hdays){
  //console.log(hdays)
  var User            = require('../routes/user');

  var daysAgo = "2017-08-24";//nDate(hdays)

  User.find({ 'debtors.when':daysAgo}, function(err, user) {
    // if there are any errors, return the error
    if (err){
      console.log(err);
      return "Contact your administrator";
    }

    // check to see if theres already a user with that username
    if (user.length > 0) {

      var rs = user;

      var tb = [];
      for (var i = 0; i < rs.length; i++) {

        var name = rs[i].debtors.name;
        var amount = rs[i].debtors.amount;
        var paid = rs[i].debtors.conct;
        var when = rs[i].debtors.when;
        var contact = rs[i].debtors.conct;
        var email = rs[i].debtors.email;
        var tr = '<tr><td>'+name+'</td><td>'+amount+'</td><td>'+paid+'</td><td>'+when+'</td><td>'+contact+'</td><td>'+email+'</td></tr>';

        tb.push(tr);

        //res.send(user)
      }
      //var tb2 = '<table> <tr> <th>Name</th><th>Amount</th><th>Paid</th><th>When</th><th>Contact</th><th>Email</th></tr>';
      //var tbend = '</table>';

      var subt = "Reminder for debtors payment due date";


      //for (var i = 0; i < tb.length; i++) {
      //  tb2 = tb2 + tb[i];
      //}

      //var msgr = tb+tbend;

      var msgr =  createTable(tb,hdays);

      sendmail({
        from: 'adecrown1@outlook.com',
        to: 'adecrown678@gmail.com',
        subject: subt,
        html: msgr,
      }, function(err, reply) {
        if(err && err.stack)
        {
          return("Something Went Wrong, Please try again.");
          //  action = "Something Went Wrong, Please try again.";
        }
        else {
          return("Message Sent.");
          //action = "Message Sent.";
        }
      });
    }
    else {
      console.log("No debtors found")
    }
  });

}



function createTable(content,days){
  var tableB = '<!DOCTYPE html><html><head><style>table { border-collapse: collapse; width: 100%;}th, td { text-align: left; padding: 8px;}tr:nth-child(even){background-color: #f2f2f2}th { background-color: #4CAF50; color: white;}</style></head><body><h2>The following debtors payment date is due in '+days+' days: </h2><table> <tr> <th>Name</th> <th>Amount</th> <th>Paid</th><th>Due Date</th> <th>Contact</th><th>Email</th></tr>'

  for (var i = 0; i < content.length; i++) {
    tableB = tableB + content[i];
  }

  var tableE = '</table></body></html>';
  var msgr = tableB+tableE;
  return msgr;
}



app.post('/sendingMail/', function(req, res) {

  //  var action;
  sendmail({
    from: 'adecrown1@outlook.com',
    to: 'adecrown678@gmail.com',
    subject: req.body.subject,
    html: req.body.message,
  }, function(err, reply) {
    if(err && err.stack)
    {
      res.send("Something Went Wrong, Please try again.");
      //  action = "Something Went Wrong, Please try again.";
    }
    else {
      res.send("Message Sent.");
      //action = "Message Sent.";
    }
    //console.log(err && err.stack);
    //console.dir(reply);
  });
  //  res.send(action); // load the index.ejs file

});




function nDate(w){
  var today = new Date();
  if (w!="") {
    var x = w; // go back 5 days!
    today.setDate(today.getDate() + x);

  }

  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd = '0'+dd
  }

  if(mm<10) {
    mm = '0'+mm
  }
  today = yyyy + '-' + mm + '-' + dd
  //today = mm + '/' + dd + '/' + yyyy;
  return today;
}





/*sendmail({
from: 'adecrown1@outlook.com',
to: 'adecrown1@outlook.com, test@sohu.com, test@163.com ',
subject: 'test sendmail',
html: 'Mail of test sendmail ',
}, function(err, reply) {
console.log(err && err.stack);
console.dir(reply);
});*/



}
