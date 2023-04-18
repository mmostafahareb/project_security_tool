const fs = require('fs');
const xml2js = require('xml2js');

function parsePomXml(filePath) {
  // Read the pom.xml file
  const xmlData = fs.readFileSync(filePath, 'utf8');
  
  // Parse the XML data using xml2js
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    
    // Extract the dependency information from the parsed data
    const dependencies = result.project.dependencies[0].dependency;
    const dependencyList = dependencies.map(dep => {
      const name = dep.artifactId[0];
      const version = dep.version[0];
      return `${name}:${version}`;
    });
    
    // Print the list of dependencies to the console
    console.log(dependencyList);
  });
}

// Example usage:
parsePomXml('path/to/pom.xml');

