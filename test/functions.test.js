const path = require("path");
const fs = require("fs");
const filesHelpers = require("../helpers/files-helpers");
const validator = require("../frontmatter-validator");

test("should return post-3", () => {
  let files = filesHelpers.getAllFiles(__dirname + "\\test-subfolder\\");
  let example = [];
  example.push(__dirname + "\\test-subfolder\\example1.md");
  example.push(__dirname + "\\test-subfolder\\example2.mdx");
  example.push(__dirname + "\\test-subfolder\\subfolder\\subfile.md");

  expect(files.toString()).toBe(example.toString());
});

test("should be an invalid path exception", () => {
  try {
    filesHelpers.getAllFiles(__dirname + "\\test-error\\");
    expect(false).toBe(true);
  } catch (error) {
    expect(error.constructor.name).toBe("PathNotExistsException");
  }
});

test("should be an invalid extension exception", () => {
  try {
    filesHelpers.getAllFiles(__dirname + "\\invalid-file-extension.mdc");
    expect(false).toBe(true);
  } catch (error) {
    expect(error.constructor.name).toBe("InvalidFileExtensionException");
  }
});
test("should validate file with no problems", () => {
  let result = filesHelpers.getAllFiles(__dirname + "\\after-validate.md");
  expect(true).toBe(true);
});

test("should get files without problems", () => {
  let files = filesHelpers.getAllFiles(__dirname + "\\test-fix\\");
  expect(true).toBe(true);
});

test("should validate file entirely with success", () => {
  let generatedFile = makeTestFile(__dirname + "/before-validate.md");

  // -- checks
  let validatedFile = filesHelpers.validateFileAndReturn(generatedFile, {
    draft: false,
    hero: "/hero.png",
    categories: ["Category"]
  });
  let expected = fs
    .readFileSync(__dirname + "/after-validate.md")
    .toLocaleString();

  deleteFile(generatedFile);
  expect(validatedFile.split("\r\n").join("\n")).toBe(
    expected.split("\r\n").join("\n")
  );
});

/// ------- Functions for help tests

function deleteFile(filepath) {
  try {
    return fs.unlinkSync(filepath);
  } catch (e) {
    return;
  }
}
const makeTestFile = origin => {
  let fpath = __dirname + "/" + makeRandomString(5) + ".md";
  fs.writeFileSync(fpath, fs.readFileSync(origin));

  return fpath;
};

function makeRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
