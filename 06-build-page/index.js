const fs = require('fs');
const path = require('path');
fs.mkdir('06-build-page/project-dist', { recursive: true }, (err) => {
  if (err) throw err;
});
let CSSpath = path.join(__dirname, 'project-dist', 'style.css');
fs.writeFile(CSSpath, '', (err) => {
  if (err) throw err;
});
fs.readdir('06-build-page/styles', (err, files) => {
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
function copyDir(src, dist) {
  fs.mkdir(dist, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(src, (err, files) => {
      if (err) throw err;
      for (let file of files) {
        fs.copyFile(src + '/' + file, dist + '/' + file, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
copyDir(
  '06-build-page/assets/fonts',
  '06-build-page/project-dist/assets/fonts',
);
copyDir('06-build-page/assets/img', '06-build-page/project-dist/assets/img');
copyDir('06-build-page/assets/svg', '06-build-page/project-dist/assets/svg');

function replaceTag() {
  let mainFile_path = path.join(__dirname, 'template.html');
  fs.readFile(mainFile_path, 'utf8', (err, data) => {
    let file_path = path.join(__dirname, 'project-dist/index.html');
    fs.writeFile(file_path, data, (err) => {
      if (err) throw err;
      let file_path = path.join(__dirname, 'project-dist/index.html');
      fs.readFile(file_path, 'utf8', (err, data1) => {
        fs.readFile(
          '06-build-page/components/header.html',
          'utf8',
          (err, data2) => {
            if (err) throw err;
            fs.readFile(
              '06-build-page/components/articles.html',
              'utf8',
              (err, data3) => {
                if (err) throw err;
                fs.readFile(
                  '06-build-page/components/footer.html',
                  'utf8',
                  (err, data4) => {
                    if (err) throw err;
                    data1 = data1.replace(/\{\{header\}\}/, data2);
                    data1 = data1.replace(/\{\{articles\}\}/, data3);
                    data1 = data1.replace(/\{\{footer\}\}/, data4);
                    fs.writeFile(file_path, data1, (err) => {
                      if (err) throw err;
                    });
                  },
                );
              },
            );
          },
        );
      });
    });
  });
}

replaceTag();
