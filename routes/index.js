exports.custom = function(url, req, res) {
	res.redirect(301, url);
};

exports.david = function(req, res){
	res.redirect(301, 'http://www.davidruttka.com/blog' + req.path);
};

// TODO: insert valid websites for the rest

exports.joey = function(req, res){
	res.redirect(301, 'http://comingsoon.com/blog' + req.path);
};


exports.chris = function(req, res){
	res.redirect(301, 'http://comingsoon.com/blog' + req.path);
};

exports.patrick = function(req, res){
	res.redirect(301, 'http://comingsoon.com/blog' + req.path);
};