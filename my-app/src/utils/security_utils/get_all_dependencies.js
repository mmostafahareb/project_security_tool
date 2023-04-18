const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const functionMap = {};

// Get the directory path of the current file
const dirPath = path.dirname(__filename);

// Read the contents of the directory
const contents = fs.readdirSync(dirPath, { withFileTypes: true });

// Loop over the contents and import any .js files
for (const item of contents) {
  if (item.isFile() && path.extname(item.name) === '.js') {
    const filePath = path.join(dirPath, item.name);
    const importedFunctions = require(filePath);
    Object.assign(functionMap, importedFunctions);
  }
}

function parseDependencies(directoryPath) {
  // Recursively search for files with the desired names
  const files = searchFiles(directoryPath, [
    'pom.xml',
    'Pipfile.lock',
    'package-lock.json',
    'build.gradle',
  ]);

  // Extract the dependencies from each file
  const dependencies = [];
  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.xml':
        dependencies.push(...parsePomXml(filePath));
        break;
      case '.lock':
        dependencies.push(...parsePipfileLock(filePath));
        break;
      case '.json':
        if (path.basename(filePath) === 'package-lock.json') {
          dependencies.push(...parsePackageLock(filePath));
        }
        break;
      case '.gradle':
        dependencies.push(...parseGradleBuild(filePath));
        break;
    }
  }

  // Remove duplicates from the list of dependencies
  const uniqueDependencies = [...new Set(dependencies)];

  // Print the list of dependencies to the console
  console.log(uniqueDependencies);
}

function searchFiles(directoryPath, fileNames) {
  let files = [];

  // Read the contents of the directory
  const contents = fs.readdirSync(directoryPath, { withFileTypes: true });

  // Filter the contents to include only files with the desired names
  const matchingFiles = contents.filter((item) => {
    if (item.isDirectory()) {
      // Recurse into subdirectories
      const subDirPath = path.join(directoryPath, item.name);
      files.push(...searchFiles(subDirPath, fileNames));
      return false;
    } else {
      return fileNames.includes(item.name);
    }
  });

  // Add the matching files to the list of files
  for (const file of matchingFiles) {
    const filePath = path.join(directoryPath, file.name);
    files.push(filePath);
  }

  return files;
}

