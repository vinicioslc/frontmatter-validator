const frontmatter = require("frontmatter");
const path = require("path");
const jsYaml = require("js-yaml");
const fs = require("fs");

const { fieldsValidator } = require("./data-helpers");

const hasValidExtension = (extensions, filename) => {
  let toReturn = false;
  for (const extension of extensions) {
    if (filename.endsWith(extension)) {
      toReturn = true;
    }
  }
  return toReturn;
};
function pushValidFile(fileToPush, extensions, filesReference) {
  if (Array.isArray(fileToPush)) {
    // TODO test coverage really need this ?
    throw new Error("Only push one valid file per time.");
  }
  if (hasValidExtension(extensions, fileToPush)) {
    filesReference.push(fileToPush);
  }
  return filesReference;
}
function getAllFiles(inputDir, extensions = [".mdx", ".md"]) {
  let normalizedDir = path.resolve(inputDir);
  let filesArray = [];
  normalizedDir = getResolvedPath(normalizedDir);
  if (fs.existsSync(normalizedDir)) {
    if (fs.lstatSync(normalizedDir).isDirectory()) {
      let dirEntries = fs
        .readdirSync(normalizedDir)
        .map((dir) => getResolvedPath(normalizedDir + "/" + dir));
      if (dirEntries.length > 0) {
        for (const curDirEntry of dirEntries) {
          if (fs.lstatSync(curDirEntry).isDirectory()) {
            // get files if is directory
            let files = getAllFiles(curDirEntry);
            for (const filesGetted of files) {
              filesArray = pushValidFile(filesGetted, extensions, filesArray);
            }
          }
          if (fs.lstatSync(curDirEntry).isFile()) {
            // push as file when are file
            filesArray = pushValidFile(curDirEntry, extensions, filesArray);
          }
        }
      }
    } else {
      if (hasValidExtension(extensions, normalizedDir)) {
        filesArray = pushValidFile(normalizedDir, extensions, filesArray);
      } else {
        throw new InvalidFileExtensionException(
          "File provided with invalid extension none of :" +
            extensions.toString()
        );
      }
    }
  } else {
    throw new PathNotExistsException("Path don't exists : " + normalizedDir);
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
    schema: jsYaml.DEFAULT_FULL_SCHEMA,
  });
  return "---\r\n" + ymlString + "---\r\n" + contentString;
}
exports.unifyDataContentFile = unifyDataContentFile;
/// find all markdown, mdx files in folder and return array

function validateFileAndReturn(file, schema, variables) {
  let fileString = fs.readFileSync(file).toLocaleString();
  let extracted = frontmatter(fileString);

  let finalData = fieldsValidator(extracted.data, schema, variables);
  return unifyDataContentFile(finalData, extracted.content);
}

exports.validateFileAndReturn = validateFileAndReturn;
