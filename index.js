const fs = require('fs');
const { promisify } = require('util');
const swaggerDoc = require('swagger-jsdoc');
const jsonRefs = require('json-refs');
const writeFile = promisify(fs.writeFile);

module.exports = async function swaggerJsDocDeref({ source, output }) {
  const options = { ...source, swaggerDefinition: source };
  delete options.swaggerDefinition.apis;
  
  const rawSpec = swaggerDoc(options);
  const spec = await jsonRefs.resolveRefs(rawSpec);
  return writeFile(output, JSON.stringify(spec.resolved, null, 2));
};
