const fs = require('fs');
const readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile('02-write-file\\text.txt', '', (err) => {
  if (err) throw err;
});
console.log('Введите текст:');

rl.on('line', (data) => {
  let line = data.split(' ');
  for (i in line) {
    if (line[i] == 'exit') {
      rl.close();
    } else {
      fs.appendFile('02-write-file\\text.txt', line[i] + ' ', (err) => {
        if (err) throw err;
      });
    }
  }
});
