// Express requires these dependencies
var express = require('express')
, http = require('http')
, path = require('path')
,favicon = require('serve-favicon')
, morgan       = require('morgan')
, bodyParser   = require('body-parser')
, session      = require('express-session')
, mongoose = require('mongoose')
, sendmail = require('sendmail')();



var app = express();


var configDB = require('./database/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url,{
  useMongoClient: true,
}); // connect to our database





// Configure our application
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
//app.use(favicon(path.join(__dirname, 'build/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'javascript')));
app.use(express.static(path.join(__dirname, 'style')));
app.use(morgan('combined')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



require('./routes/routes.js')(app,sendmail);

var server = http.createServer(app).listen( app.get('port') );
