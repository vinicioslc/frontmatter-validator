const fs = require("fs");
const filesHelpers = require("./helpers/files-helpers");
const { injectPathVariables } = require("./helpers/data-helpers");

function validateFiles(
  dirToSearch = "./",
  schemaObject,
  extArray = [".md", ".mdx"]
) {
  let envVariables = process.env;
  return (
    filesHelpers
      // find all files
      .getAllFiles(dirToSearch, extArray)
      // validate content data from files
      .map(path => {
        // get variables like FILENAME to be injected
        let variablesUsed = injectPathVariables(path, envVariables);
        return {
          path: path,
          content: filesHelpers.validateFileAndReturn(
            path,
            schemaObject,
            variablesUsed
          )
        };
      })
      // read and write all files
      .map(data => {
        fs.writeFileSync(data.path, data.content);
        return data.path;
      })
  );
}

exports.validateFiles = validateFiles;
