var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var config = require("./models/config.js");
var fs = require('fs'); // manejo filesync
var Usuario= require('./models/usuario.js');
var passport = require('passport');
var passportUser = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var env               = process.env.NODE_ENV || "development";

var methodOverride = require("method-override"); //para metodos put, delete desde el front-end

var connection = mysql.createConnection(config);

connection.connect(function(error) {
	if (error) {
		console.error('Error connecting: ' + error.stack);
		return;
	}
	console.log('Connected to server with thread ID ' + connection.threadId);
});

// Estructura de la base de datos
sql_structure = fs.readFileSync('./models/bd.sql').toString();

connection.query(sql_structure, function(error, rows) {
	if (error) throw error;
	console.log('Base de datos: Estructura completada');
});

/*app.use(function (req, res, next) {
 // Website you wish to allow to connect
 res.setHeader('Access-Control-Allow-Origin', '*');

 // Request methods you wish to allow
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 // Request headers you wish to allow
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

 // Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
 res.setHeader('Access-Control-Allow-Credentials', true);

 // Pass to next layer of middleware
 next();
 });
 */

// required for passport
app.use(session({ cookie: {
	path    : '/',
	httpOnly: false
	//maxAge  : 60000
},secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);

//app.use(express.logger('dev'));

app.use(methodOverride("_method"));

//Express
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

require('./router/routes')(app, passport, passportUser);
require('./passport/passport')(passport); // pass passport for configuration
require('./passport/passportUser')(passportUser); // pass passport for configuration User

//Routes
app.use('/api', require('./router/api'));


app.listen(3000, function() {
	console.log("Servidor iniciado");
});