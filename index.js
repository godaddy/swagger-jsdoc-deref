const fs = require('fs');
const { promisify } = require('util');
const swaggerDoc = require('swagger-jsdoc');
const jsonRefs = require('json-refs');
const writeFile = promisify(fs.writeFile);

module.exports = async function swaggerJsDocDeref({ source, output }) {
  // Extract apis from source if present
  const { apis, ...definition } = source;

  // Build options object for swagger-jsdoc v6.x
  const options = {
    definition,
    apis: apis || []
  };

  const rawSpec = swaggerDoc(options);
  const spec = await jsonRefs.resolveRefs(rawSpec);
  return writeFile(output, JSON.stringify(spec.resolved, null, 2));
};
