const fs = require('fs');
const path = require('path');

let folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    for (let file of files){
        fs.stat(path.join(folderPath, file), (err, stats) => {
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