"use-strict";
const fs = require("fs");
const filesHelpers = require("./helpers/files-helpers");

function validateFiles(
  dirToSearch = "./",
  schemaObject,
  extArray = [".md", ".mdx"]
) {
  return (
    filesHelpers
      // find all files
      .getAllFiles(dirToSearch, extArray)
      // validate content data from files
      .map(path => {
        return {
          path: path,
          content: filesHelpers.validateFileAndReturn(path, schemaObject)
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
