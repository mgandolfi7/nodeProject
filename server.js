const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const { deepStrictEqual } = require("assert");

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);

    function readWrite(file, contentType) {
        fs.readFile(file, function(err, data) {
            res.writeHead(200, {"Content-Type": contentType});
            res.write(data);
            res.end();
        });
    }
    switch(page) {
        case "/" :
            readWrite("index.html", "text/html")
        break;
        case "/api" :
            res.whriteHead(200, {"Content-Type": "application/json"});
            let flipResult = Math.random() > 0.5 ? "heads" : "tails"
            const objToJson = {
                flip: flipResult
            }
            res.end(JSON.stringify(objToJson));
        break;
        case "/css/style.css" :
            fs.readFile("css/style.css", function(err, data) {
                res.write(data);
                res.end();
            });
        break;
        case "/js/main.js" :
            fs.readFile("js/main.js", function(err, data) {
                res.writeHead(200, {"Content-Type": "text/javascript"});
                res.write(data);
                res.end();
            });
        break;
        default:
            figlet("404!", function(err, data) {
                if (err) {
                    console.log("Something went wrong...");
                    console.dir(err);
                    return;
                }
                res.write(data);
                res.end();
            });
    }
});

server.listen(3000);

