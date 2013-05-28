var http = require('http');
var BarcodeDatamatrix = require('./lib/datamatrix').BarcodeDatamatrix;
var label = require('./lib/label');

var datamatrix = new BarcodeDatamatrix();
var dm = datamatrix.getDigit('H',false);
		

var server = http.createServer(function(req, res) {
    res.writeHead(200);
	 var svg = label.svg();
	 res.end('<html><body>'+svg+'</body></html>');
});

server.listen(parseInt(process.env.PORT) || 3000);
console.log("server listening on port %d …", server.address().port);