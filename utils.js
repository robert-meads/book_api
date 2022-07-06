const fs = require('fs');
const { resolve } = require('path');

function writeDataToFile(filename, content) {
  fs.writeFile(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  writeDataToFile,
};
