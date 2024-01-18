const fs = require('fs');
const path = require('path');
let CSSpath = path.join(__dirname, 'project-dist', 'bundle.css');
fs.writeFile(CSSpath, '', (err) => {
  if (err) throw err;
});
fs.readdir('05-merge-styles/styles', (err, files) => {
  for (let file of files) {
    let file_path = path.join(__dirname, 'styles', file);
    fs.readFile(file_path, 'utf8', (err, data) => {
      if (err) throw err;
      let fileExtension = path.extname(file_path);
      if (fileExtension == '.css') {
        fs.appendFile(CSSpath, data + '\n', (err) => {
          if (err) throw err;
        });
      }
    });
  }
});
