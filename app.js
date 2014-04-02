
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var config = require('./config/config.json');
var redirects = require('./config/redirects.json');
var sendgrid = require('./config/sendgrid');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for the 404 reporting
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if (config["404-email"]) {
	app.get('/found-404', function (req, res) {
		if (req.query.url) {
			sendgrid.send({
				to: config["404-email"],
				from: config["404-email"],
				subject: "404 URL found: " + req.query.url,
				text: "404 URL: " + req.query.url
			});
		}
		res.end();
	});
}

var url;

for(url in redirects.pages) {
  if (Object.prototype.hasOwnProperty(redirects.pages, url)) {
    app.get(url, function (req, res) {
      res.redirect(301, redirects.sites[redirects.pages[url]]);
    });
  }
}

for (url in redirects.custom) {
  if (Object.prototype.hasOwnProperty(redirects.pages, url)) {
    app.get(url, function (req, res) {
      res.redirect(301, redirects.custom[url]);
    });
  }
}

// Redirect each post here
// You could probably export the WP site and format it into JSON to generate these redirects
app.get('/2014/03/30/dev-did-work-moved-to-octopress-github-pages/', routes.david);

// There's also a custom url handler for any special cases
app.get('/google', routes.custom.bind(routes, 'http://www.google.com/'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
