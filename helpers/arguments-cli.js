/**
 * Will lookup the argument in the cli arguments list and will return a
 * value passed as CLI arg (if found)
 * Otherwise will return default value passed if none provide will be null
 * @param argName - name of hte argument to search
 * @param defaultValue - default value to return if could not find argument in cli command default is null
 * @private
 */
const findArgument = (argName, defaultValue) => {
  let willReturn = null;
  if (argName) {
    try {
      const findedIndex = process.argv.findIndex(a => a.match(argName));
      if (findedIndex >= 0) {
        willReturn = process.argv[findedIndex + 1];
      }
    } catch (e) {}
  } else {
    console.warn("Missing argument name or defaultValue", argName);
  }
  return willReturn || defaultValue || null;
};

module.exports = { findArgument };
