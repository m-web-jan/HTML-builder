const fs = require('fs');
const path = require('path');
let filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath);

readableStream.on('data', function (chunk) {
  console.log(chunk.toString());
});
