var http = require('http');
var fs = require('fs');
var mime = require('mime');

http.createServer(function(req, res) {
    var template = 'mon super template';

    // Static js file
    if (/\.js$/.test(req.url)) {
        var mimeType = mime.lookup(__dirname + '/../public/' + req.url);
        var jsContent = fs.readFileSync(__dirname + '/../public/' + req.url);
        res.writeHead(200, {'Content-Type': mimeType });
        res.end(jsContent);
    }

    // Static images file
    else if (/img\/.*$/.test(req.url)) {
        var mimeType = mime.lookup(__dirname + '/../public/' + req.url);
        var image = fs.readFileSync(__dirname + '/../public/' + req.url);
        res.writeHead(200, {'Content-Type': mimeType });
        res.end(image);
    }

    // Static css file
    else if (/\.css$/.test(req.url)) {
        var mimeType = mime.lookup(__dirname + '/../public/' + req.url);
        var css = fs.readFileSync(__dirname + '/../public/' + req.url);
        res.writeHead(200, {'Content-Type': mimeType });
        res.end(css);
    }

    // Static fonts
    else if (/fonts.*$/.test(req.url)) {
        var mimeType = mime.lookup(__dirname + '/../public/' + req.url);
        var css = fs.readFileSync(__dirname + '/../public/' + req.url);
        res.writeHead(200, {'Content-Type': mimeType });
        res.end(css);
    }

    else {
        // Serve home page
        var mimeType = mime.lookup(__dirname + '/../public/index.html');
        template = fs.readFileSync(__dirname + '/../public/index.html');
        res.writeHead(200, {'Content-Type': mimeType });
        res.end(template);
    }

}).listen(process.env.PORT || 3000);
