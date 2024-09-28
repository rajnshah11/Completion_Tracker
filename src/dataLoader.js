const fs = require('fs');

function loadData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading data from ${filePath}: ${error.message}`);
        return [];
    }
}

module.exports = loadData;
