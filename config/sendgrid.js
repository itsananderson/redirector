var SendGrid = require('sendgrid');

var user = process.env.SENDGRID_USER;
var pass = process.env.SENDGRID_PASS;

if (user && pass) {
	module.exports = SendGrid(user, pass);
} else {
	// No username/password configured. Mock sendgrid sender
	console.warn('No SendGrid credentials configured. Email sending will not work');
	module.exports = {
		send: function(email, callback){ console.log(email); callback(true) },
		smtp: function(email, callback){ console.log(email); callback(true) }
	};
}
