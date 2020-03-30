"use-strict";

const frontmatter = require("frontmatter");
const path = require("path");
const jsYaml = require("js-yaml");
const fs = require("fs");

const { fieldsValidator } = require("./data-helpers");

const isValidExtension = (extensions, filename) => {
  let toReturn = false;
  for (const extension of extensions) {
    if (filename.endsWith(extension)) {
      toReturn = true;
    }
  }
  return toReturn;
};
function pushValidFile(toPushPath, extensions, filesArray) {
  if (isValidExtension(extensions, toPushPath)) {
    filesArray.push(toPushPath);
  }
  return filesArray;
}
function getAllFiles(dirToSearch, extensions = [".mdx", ".md"]) {
  let filesArray = [];
  dirToSearch = getResolvedPath(dirToSearch);
  if (fs.existsSync(dirToSearch)) {
    if (fs.lstatSync(dirToSearch).isDirectory()) {
      let dirEntries = fs
        .readdirSync(dirToSearch)
        .map(dir => getResolvedPath(dirToSearch + "/" + dir));
      if (dirEntries.length > 0) {
        for (let entry of dirEntries) {
          if (fs.lstatSync(entry).isDirectory()) {
            // get files if is directory
            let files = getAllFiles(entry);
            filesArray = pushValidFile(...files, extensions, filesArray);
          } else if (fs.lstatSync(entry).isFile()) {
            // push as file when are file
            filesArray = pushValidFile(entry, extensions, filesArray);
          }
        }
      }
    } else {
      if (isValidExtension(extensions, dirToSearch)) {
        filesArray = pushValidFile(dirToSearch, extensions, filesArray);
      } else {
        throw new InvalidFileExtensionException(
          "File provided with invalid extension none of :" +
            extensions.toString()
        );
      }
    }
  } else {
    throw new PathNotExistsException("Path don't exists : " + dirToSearch);
  }
  return filesArray;
}

class PathNotExistsException extends Error {
  constructor(message) {
    super(message);
  }
}
exports.PathDontExistsException = PathNotExistsException;

class InvalidFileExtensionException extends Error {
  constructor(message) {
    super(message);
  }
}
exports.InvalidFileExtensionException = InvalidFileExtensionException;

exports.getAllFiles = getAllFiles;

function getResolvedPath(dir1) {
  return path.resolve(path.join(dir1));
}

exports.getResolvedPath = getResolvedPath;

function unifyDataContentFile(dataFields, contentString) {
  let ymlString = jsYaml.safeDump(dataFields, {
    schema: jsYaml.DEFAULT_FULL_SCHEMA
  });
  return "---\r\n" + ymlString + "---\r\n" + contentString;
}
exports.unifyDataContentFile = unifyDataContentFile;
/// find all markdown, mdx files in folder and return array

function validateFileAndReturn(file, schema) {
  let fileString = fs.readFileSync(file).toLocaleString();
  let extracted = frontmatter(fileString);

  let finalData = fieldsValidator(extracted.data, schema);
  return unifyDataContentFile(finalData, extracted.content);
}

exports.validateFileAndReturn = validateFileAndReturn;
