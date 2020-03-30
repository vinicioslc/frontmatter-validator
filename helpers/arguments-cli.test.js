const { findArgument } = require("./arguments-cli");

test("its using default parameters if none found", () => {
  //   process.argv = process.argv + ' --teste="slaoq" ';
  expect(findArgument("--folder", "_DEFAULT_")).toBe("_DEFAULT_");
});

test("its finding parameters correctly", () => {
  process.argv.push("--folder");
  process.argv.push("_VALUE_");
  // Arguments added to commandline
  // [
  // '--folder',
  // '_VALUE_'
  // ]

  expect(findArgument("--folder", "_DEFAULT_")).toBe("_VALUE_");
  process.argv.pop();
  process.argv.pop();
});

test("returns default value  when no arguments name is given", () => {
  expect(findArgument(undefined, "_DEFAULT_")).toBe("_DEFAULT_");
});

test("returns default value if argument its invalid", () => {
  expect(findArgument("--defaultinvalid", "_DEFAULT_")).toBe("_DEFAULT_");
});

test("returns default value something happen with argv", () => {
  process.argv = null;
  expect(findArgument("--defaultinvalid", "_DEFAULT_")).toBe("_DEFAULT_");
});

test("returns null if default value is invalid", () => {
  process.argv = null;
  expect(findArgument("--defaultinvalid", undefined)).toBe(null);
});
