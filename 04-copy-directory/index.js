function copyDir() {
  const fs = require('fs');
  fs.mkdir('04-copy-directory/files-copy', { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir('04-copy-directory/files', (err, files) => {
    if (err) throw err;
    for (let file of files) {
      fs.copyFile(
        '04-copy-directory/files/' + file,
        '04-copy-directory/files-copy/' + file,
        (err) => {
          if (err) throw err;
        },
      );
    }
  });
}

copyDir();
