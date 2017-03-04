var express 	= require('express');
var mysql		= require('mysql');
var path 		= require('path');
var bodyParser 	= require('body-parser');
var app 		= express();

const port 		= 3001;
const rootPath 	= path.join(__dirname, './');
const jsPath 	= path.join(__dirname, './public/js');
const cssPath 	= path.join(__dirname, './public/css');

//app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));


//Connect and handle DB 
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test',
  database : 'expressjs'
});
 
connection.connect(function(error) {
	if (error) throw error;
	console.log('We are now connected');
	connection.query('CREATE TABLE IF NOT EXISTS people(id int auto_increment primary key, name varchar(255), lastname varchar(255))', function(error, result) {
	  if (error) throw error;
	});
});	
 
//connection.end();

//Loading index.html
app.get('/index', function(request, response) {
	response.sendFile('index.html', {root: rootPath})
});

//load the body-parser to get the requests data extracted
app.use(bodyParser.json());

//Ajax paths for CRUD operations
app.get('/persons', function(request, response) {
		connection.query('SELECT * FROM people', function(error, results) {
		if (error) throw error;
		var resultsString = JSON.stringify(results);
		var resultsJson = JSON.parse(resultsString);
		response.send(resultsJson);
		//console.log(resultsJson);
		});
});

app.post('/persons', function(request, response) {
	var name = request.body.name;
	var lastname = request.body.lastname; 
	connection.query('INSERT INTO people(name, lastname) VALUES(?,?)', [name, lastname], function(error, result) {
		if (error) throw error;
		response.send('Person added');
		});
});

//Load JS Files
app.use('/js',express.static(jsPath));


//Configure Server to listen to specific port
app.listen(port, function() {
	console.log('Listening to port 3001');
});
