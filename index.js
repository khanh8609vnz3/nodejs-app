let n = require('./name.js');
let fs = require('fs');
console.log(n);
var bufferText = new Buffer.from('Khanh', 'utf-8');
console.log(bufferText);
console.log(bufferText.toString());

let text = fs.readFileSync(__dirname + "/test.txt");
console.log(text.toString());