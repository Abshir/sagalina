var express = require('express'),
fs = require('fs'),
http = require('http'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
path = require('path'),
MemoryStore = require('memory'),
Session = require('express-session');

var environment = process.env.NODE_ENV || 'development',
config = require('../config/config')[environment];

var mongoose = require('mongoose');
mongoose.connect(config.db);

var modelPath = __dirname + '/../models',
modelFiles = fs.readdirSync(modelPath);

modelFiles.forEach(function(file) {
	require(modelPath + '/' + file);
});

var app = express();

	app.set('port', process.env.PORT || config.port);
	app.use(express.static(path.join(__dirname, '../../client/')));
	app.use(bodyParser.json());

http.createServer(app).listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port'));
});

require('../routes/routes.js')(app);