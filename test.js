var http = require('http');
var label = require('./lib/label');



var server = http.createServer(function(req, res) {
	res.writeHead(200);
	var svg = label.Label({});
	res.end('<html><body>'+svg+'</body></html>');
});

server.listen(parseInt(process.env.PORT) || 3000);
console.log("server listening on port %d …", server.address().port);