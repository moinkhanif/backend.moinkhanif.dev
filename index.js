var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It worksSS!\n',
        version = 'NodeJS ' + process.env.WEATHER_API_KEY + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
server.listen();
