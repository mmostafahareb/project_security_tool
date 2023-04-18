const fs = require('fs');

function parsePipfileLock(filePath) {
  // Read the Pipfile.lock file
  const fileData = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON data
  const jsonData = JSON.parse(fileData);

  // Extract the package information from the parsed data
  const packages = jsonData.default;

  // Map over each package and extract the name and version
  const packageList = Object.keys(packages).map(pkgName => {
    const version = packages[pkgName].version;
    return `${pkgName}:${version}`;
  });

  // Print the list of packages to the console
  console.log(packageList);
}

