/* eslint no-process-env: 0 */
const { describe, it } = require('mocha');
const assume = require('assume');
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlink = promisify(fs.unlink);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const exec = promisify(childProcess.exec);

describe('e2e', function () {
  const outputFile = 'test/fixtures/output.json';
  const inputFile = 'test/fixtures/swagger.js';
  const additionalFile = 'test/fixtures/additional-api.yaml';
  const outputPath = path.join(__dirname, 'fixtures', 'output.json');
  const baseCommand = `${process.env.PWD}/bin/swagger-jsdoc-deref -o ${outputFile} -d ${inputFile}`;

  afterEach(async function () {
    await unlink(outputPath);
  });

  it('generates output', async function () {
    await exec(baseCommand, { cwd: process.env.PWD });

    assume(await exists(outputPath)).to.be.true();

    const rawFile = await readFile(outputPath, 'utf8');
    assume(rawFile).to.exist();

    const data = JSON.parse(rawFile);
    assume(data).to.exist();
    assume(data.paths).to.exist();

    const route = data.paths['/foo/{bar}'];
    assume(route).to.exist();
    assume(route.get).to.exist();

    // Make sure parameters are dereferenced
    assume(route.get.parameters).to.have.length(1);
    assume(route.get.parameters[0].description).to.equal('Type of bar');

    // Make sure responses are dereferenced
    assume(route.get.responses).to.exist();
    assume(route.get.responses['200']).to.exist();
    assume(route.get.responses['200'].description).to.equal('Here\'s the thing you wanted');
  });

  it('generates output w/ additional apis', async function () {
    const baseCommandWithApis = `${baseCommand} ${additionalFile}`;
    await exec(baseCommandWithApis, { cwd: process.env.PWD });

    assume(await exists(outputPath)).to.be.true();

    const rawFile = await readFile(outputPath, 'utf8');
    assume(rawFile).to.exist();

    const data = JSON.parse(rawFile);

    // Make sure additional apis are added
    const additionalRoute = data.paths['/additional'];
    assume(additionalRoute).to.exist();
    assume(additionalRoute.get).to.exist();
  });
});
