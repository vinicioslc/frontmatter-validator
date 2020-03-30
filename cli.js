"use-strict";

const { getAllFiles } = require("./frontmatter-normalizer");

async function main() {
  let path = "./";
  let schemaFile = "frontmatter-schema.json";
  let extensions = [".md", ".mdx"];

  console.log(validateFiles(path, schemaFile, extensions));
}

main();
