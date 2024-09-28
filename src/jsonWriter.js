const fs = require('fs');

function writeJsonToFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Data successfully written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing file ${filePath}: ${error.message}`);
    }
}

module.exports = writeJsonToFile;
