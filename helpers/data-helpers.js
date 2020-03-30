function fieldsValidator(data, schema) {
  let transformed = data;
  for (const key in schema) {
    const defaultValue = schema[key];
    if (
      transformed[key] === undefined ||
      transformed[key] === null ||
      transformed[key] === ""
    ) {
      transformed[key] = defaultValue;
    } else {
      if (Array.isArray(transformed[key]) && transformed[key].length <= 0) {
        transformed[key] = defaultValue;
      }
    }
  }
  return transformed;
}

exports.fieldsValidator = fieldsValidator;
