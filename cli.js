const path = require("path");
const fs = require("fs");
const findArguments = require("./helpers/arguments-cli").findArgument;
const { validateFiles } = require("./frontmatter-validator");

async function main() {
  let markdownPath = findArguments("path", "./");

  let schemaPath = findArguments("schema", "./frontmatter-schema.json");

  let schemaObj = JSON.parse(
    fs.readFileSync(path.resolve(schemaPath).toString("utf-8"))
  );
  if (!schemaObj) {
    throw new Error("Schema Object invalid");
  }

  let extensions = findArguments("extension", ".md,.mdx").split(",");

  console.log("Finding files in :", markdownPath);
  console.log("Schema Object :", schemaPath);
  console.log("Extensions Searched :", extensions);
  console.time("Validate Time");
  let validatedFiles = validateFiles(markdownPath, schemaObj, extensions);
  console.timeEnd("Validate Time");
  console.log("Total files :", validatedFiles.length);

  console.log("Validated List:\r\n", validatedFiles.join("\r\n"));
}

main();
