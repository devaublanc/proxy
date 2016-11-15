var express = require('express');
var request = require('request');
var app = express();

app.get('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const isDev = req.path.indexOf('contents') === -1
    request(`http://medusa.${ isDev ? 'dev': 'stg' }.ifeelsmart.net${req.path}?device=62`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.setHeader('Content-Type', 'application/json');
            res.send(body);
        } else {
            console.error(error, response.statusCode)
        }
    })
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
