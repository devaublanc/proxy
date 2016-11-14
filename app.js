var express = require('express');
var request = require('request');
var app = express();

app.get('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    request('http://medusa.dev.ifeelsmart.net' + req.path + '?device=62', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.setHeader('Content-Type', 'application/json');
            res.send(body);
        }
    })

});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
