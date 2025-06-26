const { camelCase } = require('change-case');

function transformer(schemaObject) {
  if (Array.isArray(schemaObject)) {
    return schemaObject.map(transformer);
  }

  if (schemaObject !== null && typeof schemaObject === 'object') {
    const newObj = {};
    for (const key in schemaObject) {
      if (schemaObject.hasOwnProperty(key)) {
        newObj[camelCase(key)] = transformer(schemaObject[key]);
      }
    }
    return newObj;
  }

  return schemaObject;
}

module.exports = transformer;
