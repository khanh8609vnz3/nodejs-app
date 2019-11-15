var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // let data = fs.readFileSync(__dirname + "/index.html", "utf-8");
    // data = data.replace("{TEST}", "KHANH TRAN HOANG");
    // res.end(data);
    // fs.createReadStream(__dirname + "/index.html").pipe(res);
    let data = { name: 'Khanh', lastName: 'Tran' };
    res.end(JSON.stringify(data));
}).listen(8888);