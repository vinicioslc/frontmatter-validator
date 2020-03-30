"use-strict";

const path = require("path");
const findArguments = require("./helpers/arguments-cli").findArgument;
const { validateFiles } = require("./frontmatter-validator");

async function main() {
  let markdownPath = findArguments("path", "./");
  let schemaPath = findArguments("schema", "./frontmatter-schema.json");
  let schemaObj = require(path.resolve(schemaPath));
  let extensions = findArguments("extension", ".md,.mdx").split(",");

  console.log("Finding files in :", markdownPath);
  console.log("Schema Object :", schemaPath);
  console.log("Extensions Searched :", extensions);
  // console.log(path, schemaFile, extensions);
  console.time("Convert Time");
  let convertedFiles = validateFiles(markdownPath, schemaObj, extensions);
  console.timeEnd("Convert Time");
  console.log("Total files :", convertedFiles.length);

  console.log("Converted List:\r\n", convertedFiles.join("\r\n"));
}

main();
