var port = process.env.PORT || 8080;

var express  = require('express');
var app      = express();                              
var mongoose = require('mongoose');                     
var morgan = require('morgan');                  // log requests to the console (express4)
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(express.static(__dirname + '/public'));                
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./app/routes.js')(app); 

app.listen(port);
console.log("App listening on port " + port);