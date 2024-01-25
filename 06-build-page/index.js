const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
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
copyDir(path.join(__dirname, 'assets/fonts'), path.join(__dirname, 'project-dist/assets/fonts'));
copyDir(path.join(__dirname, 'assets/img'), path.join(__dirname, 'project-dist/assets/img'));
copyDir(path.join(__dirname, 'assets/svg'), path.join(__dirname, 'project-dist/assets/svg'));



function replaceTag() {
  let mainFile_path = path.join(__dirname, 'template.html');
  fs.readFile(mainFile_path, 'utf8', (err, data) => {
    let file_path = path.join(__dirname, 'project-dist/index.html');
    fs.writeFile(file_path, data, (err) => {
      if (err) throw err;
      let file_path = path.join(__dirname, 'project-dist/index.html');
      fs.readFile(file_path, 'utf8', (err, data1) => {
        fs.readFile(
          path.join(__dirname, 'components/header.html'),
          'utf8',
          (err, data2) => {
            fs.readFile(
              path.join(__dirname, 'components/articles.html'),
              'utf8',
              (err, data3) => {
                fs.readFile(
                  path.join(__dirname, 'components/footer.html'),
                  'utf8',
                  (err, data4) => {
                    if (data1.includes('{{about}}')) {
                      fs.readFile(
                        path.join(__dirname, 'components/about.html'),
                        'utf8',
                        (err, data5) => {
                          data1 = data1.replace(/\{\{header\}\}/, data2);
                          data1 = data1.replace(/\{\{articles\}\}/, data3);
                          data1 = data1.replace(/\{\{footer\}\}/, data4);
                          data1 = data1.replace(/\{\{about\}\}/, data5);
                          fs.writeFile(file_path, data1, (err) => {
                            if (err) throw err;
                          });
                        },
                      );
                    }
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
