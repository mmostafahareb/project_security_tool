const fs = require('fs');

function parseRequirements(filePath) {
  // Read the requirements.txt file
  const fileData = fs.readFileSync(filePath, 'utf8');

  // Split the file data into lines and remove any empty lines
  const lines = fileData.split('\n').filter(line => line.trim() !== '');

  // Map over each line and extract the package name and version
  const packageList = lines.map(line => {
    const [name, version] = line.split('==');
    return `${name}:${version}`;
  });

  // Print the list of packages to the console
  console.log(packageList);
}

