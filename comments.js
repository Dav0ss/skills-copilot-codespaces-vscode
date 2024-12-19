// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = [];
var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    if (path === '/comment') {
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function(chunk) {
                body += chunk;
            });
            req.on('end', function() {
                var comment = JSON.parse(body);
                comments.push(comment);
                res.statusCode = 200;
                res.end();
            });
        } else if (req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(comments));
        }
    } else {
        var filename = path.substring(1);
        fs.createReadStream(filename).pipe(res);
    }
});
server.listen(8080);