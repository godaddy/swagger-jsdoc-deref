const { describe, it } = require('mocha');
const assume = require('assume');
const sinon = require('sinon');
const fs = require('fs');
const jsonRefs = require('json-refs');
const proxyquire = require('proxyquire').noCallThru();

assume.use(require('assume-sinon'));

describe('swagger-jsdoc-deref', function () {
  let swaggerJsDoc;
  let resolveRefs;
  let writeFile;
  let runIt;

  beforeEach(function () {
    swaggerJsDoc = sinon.stub();
    resolveRefs = sinon.stub(jsonRefs, 'resolveRefs');
    writeFile = sinon.stub(fs, 'writeFile');
    runIt = proxyquire('../index', {
      'swagger-jsdoc': swaggerJsDoc
    });
  });

  afterEach(function () {
    sinon.restore();
  });

  it('calls swagger-jsdoc', async function () {
    const source = { some: 'file' };
    const output = '/tmp/foo/bar.json';
    const rawSwagger = { another: 'thing' };
    const swaggerDoc = { finally: 'done' };
    swaggerJsDoc.returns(rawSwagger);
    resolveRefs.resolves({ resolved: swaggerDoc });
    writeFile.callsArgAsync(2);

    await runIt({
      source,
      output
    });

    assume(swaggerJsDoc).was.calledWithMatch({
      ...source,
      swaggerDefinition: source
    });
    assume(resolveRefs).was.calledWith(rawSwagger);
    assume(writeFile).was.calledWithMatch(output, JSON.stringify(swaggerDoc, null, 2));
  });
});
