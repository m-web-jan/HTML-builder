const fs = require('fs');
const readline = require('readline');
const path = require('path');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});
console.log('Введите текст:');

rl.on('line', (data) => {
  let line = data.split(' ');
  for (i in line) {
    if (line[i] == 'exit') {
      rl.close();
    } else {
      fs.appendFile(filePath, line[i] + ' ', (err) => {
        if (err) throw err;
      });
    }
  }
});
