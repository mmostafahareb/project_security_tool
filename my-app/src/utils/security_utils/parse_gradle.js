const fs = require('fs');

function parseGradleBuild(filePath) {
  // Read the build.gradle file
  const fileData = fs.readFileSync(filePath, 'utf8');

  // Extract the dependency information from the file data
  const regex = /(?:implementation|compile)\s+['"]([^:]+):([^:]+):([^'"]+)['"]/gm;
  let match;
  const dependencyList = [];
  while ((match = regex.exec(fileData)) !== null) {
    const name = match[1];
    const version = match[3];
    dependencyList.push(`${name}:${version}`);
  }

  // Print the list of dependencies to the console
  console.log(dependencyList);
}

