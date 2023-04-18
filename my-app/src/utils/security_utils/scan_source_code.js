const { execSync } = require('child_process');
const path = require('path');

async function scanSourceCode(codeLocation, language, queryFile, databaseDirectory, sarifFile) {
  try {
    // Get language identifier
    const languageIds = {
      cpp: 'cpp',
      csharp: 'csharp',
      go: 'go',
      java: 'java',
      javascript: 'javascript',
      kotlin: 'java',
      python: 'python',
      ruby: 'ruby',
      typescript: 'javascript'
    };
    const languageId = languageIds[language.toLowerCase()];
    if (!languageId) {
      throw new Error('CodeQL does not support scanning this language');
    }

    // Create CodeQL database
    execSync(`codeql database create ${databaseDirectory} --language=${languageId} ${databaseDirectory}`);

    // Run CodeQL analysis
    execSync(`codeql database analyze ${databaseDirectory} ${queryFile} --search-path=${path.join(codeLocation, 'src')} --sarif ${sarifFile}`);

    console.log(`Analysis complete. Results exported to ${sarifFile}.`);
  } catch (error) {
    console.error(error);
  }
}

