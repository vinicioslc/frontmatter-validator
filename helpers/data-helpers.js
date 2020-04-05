const path = require("path");

// TODO Make tests cover this
function injectPathVariables(filePath, variablesObject) {
  let file_ext = path.extname(filePath);
  let filename =
    path.basename(filePath).replace(file_ext, "") || "ERROR_FILENAME";

  variablesObject["FILENAME"] = filename;
  variablesObject["FILE_EXT"] = file_ext;
  return variablesObject;
}

exports.injectPathVariables = injectPathVariables;

function injectVariable(pureValue, variables) {
  let changedValue = pureValue;
  for (const variableKey in variables) {
    if (variables.hasOwnProperty(variableKey)) {
      const variableValue = variables[variableKey];
      if (
        (typeof changedValue === "string" || changedValue instanceof String) &&
        changedValue.includes(variableKey)
      ) {
        // replace key in value with variable value
        changedValue = changedValue.replace(
          `\{${variableKey}\}`,
          variableValue
        );
      }
    }
  }
  return changedValue;
}
/**
 *
 * @param {object} dataIn data from frontmatter file
 * @param {object} valuesSchema values to be injected in data when missing
 * @param {object} variables Variables to be injected in string values
 */
function fieldsValidator(dataIn, valuesSchema, variables) {
  let dataOut = dataIn;
  for (const schemaKey in valuesSchema) {
    const defaultValue = valuesSchema[schemaKey];

    if (
      dataOut[schemaKey] === undefined ||
      dataOut[schemaKey] === null ||
      dataOut[schemaKey] === ""
    ) {
      dataOut[schemaKey] = defaultValue;
      // inject variables
      dataOut[schemaKey] = injectVariable(dataOut[schemaKey], variables);
    } else {
      if (Array.isArray(dataOut[schemaKey]) && dataOut[schemaKey].length <= 0) {
        dataOut[schemaKey] = defaultValue;
      }
    }
  }
  return dataOut;
}

exports.fieldsValidator = fieldsValidator;
