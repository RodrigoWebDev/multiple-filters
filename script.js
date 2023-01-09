//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, './dist');

fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    const cssFileName = files.filter(item => item.includes(".css") && !item.includes(".map"))[0]

    fs.unlink(`${directoryPath}/${cssFileName}`, (err) => {
        if (err) {
            throw err;
        }

        fs.rename(
          `${directoryPath}/index.css`, 
          `${directoryPath}/${cssFileName}`, 
          function (err) {
            if (err) throw err;
            console.log('File Renamed.');
          }
        );
    
        console.log("Delete File successfully.");
    });
});