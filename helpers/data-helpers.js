const path = require("path");

function injectVariable(pureValue, variables) {
  let injected = pureValue;
  for (const key in variables) {
    if (variables.hasOwnProperty(key)) {
      const variableValue = variables[key];
      if (typeof injected == "string" && injected != "") {
        injected.replace(`\{${key}\}`, variableValue);
      }
    }
  }
  return injected;
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

    dataOut[schemaKey] = injectVariable(dataOut[schemaKey], variables);

    if (
      dataOut[schemaKey] === undefined ||
      dataOut[schemaKey] === null ||
      dataOut[schemaKey] === ""
    ) {
      dataOut[schemaKey] = defaultValue;
    } else {
      if (Array.isArray(dataOut[schemaKey]) && dataOut[schemaKey].length <= 0) {
        dataOut[schemaKey] = defaultValue;
      }
    }
  }
  return dataOut;
}

exports.fieldsValidator = fieldsValidator;

function extractPathVariables(filePath, variablesObject) {
  let extractedName =
    path.basename(filePath).replace(path.extname(filePath), "") ||
    "ERROR_FILENAME";

  variablesObject.FILENAME = extractedName;

  return variablesObject;
}

exports.extractPathVariables = extractPathVariables;
