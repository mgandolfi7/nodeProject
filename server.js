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
            if('choice' in params){

                const objToJson = {
                }

                let botChoice = Math.random() > 0.66 ? "rock" : Math.random() > .33 ? "paper" : "scissors"
                if(params['choice'] === 'rock' && botChoice === "scissors"){
                  res.writeHead(200, {'Content-Type': 'application/json'});
                  objToJson.result = "rock wins!"
                  objToJson.botChoice = botChoice
                  res.end(JSON.stringify(objToJson));

                } else if (params["choice"] === "paper" && botChoice === "rock") {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    objToJson.result = "paper wins!"
                    objToJson.botChoice = botChoice
                    res.end(JSON.stringify(objToJson));

                } else if (params["choice"] === "scissors" && botChoice === "paper") {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    objToJson.result = "scissors wins!"
                    objToJson.botChoice = botChoice
                    res.end(JSON.stringify(objToJson));
                } else if (params["choice"] === botChoice) {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    objToJson.result = "round tied!"
                    objToJson.botChoice = botChoice  
                    res.end(JSON.stringify(objToJson));
                }
                else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    objToJson.result = "roud lost!"
                    objToJson.botChoice = botChoice
                    res.end(JSON.stringify(objToJson));
                    } 
                }
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

server.listen(8000);

