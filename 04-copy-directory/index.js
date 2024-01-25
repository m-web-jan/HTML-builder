function copyDir() {
  const fs = require('fs');
  fs.rm('04-copy-directory/files-copy', { recursive: true, force: true }, () => {
    fs.mkdir('04-copy-directory/files-copy', { recursive: true }, () => {
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
    });
  });
}

copyDir();
