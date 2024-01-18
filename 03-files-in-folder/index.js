const fs = require('fs');
const path = require('path');

fs.readdir('03-files-in-folder\\secret-folder', (err, files) => {
    if (err) throw err;
    for (let file of files){
        fs.stat('03-files-in-folder\\secret-folder' + '/' + file, (err, stats) => {
            if (err) throw err;
            if (!stats.isDirectory()) {
                let file_path = path.join(__dirname, file);
                let fileName = path.basename(file_path, path.extname(file_path));
                let fileExtension = path.extname(file_path).slice(1, path.extname(file_path).length);
                let fileWeigth = stats.size / 1000 + 'kb';
                console.log(`${fileName} - ${fileExtension} - ${fileWeigth}`);
            }
        })
    }
});