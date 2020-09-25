# swagger-jsdoc-deref

[![CircleCI](https://circleci.com/gh/godaddy/swagger-jsdoc-deref.svg?style=svg)](https://circleci.com/gh/godaddy/swagger-jsdoc-deref)
[![codecov](https://codecov.io/gh/godaddy/swagger-jsdoc-deref/branch/master/graph/badge.svg)](https://codecov.io/gh/godaddy/swagger-jsdoc-deref) [![Greenkeeper badge](https://badges.greenkeeper.io/godaddy/swagger-jsdoc-deref.svg)](https://greenkeeper.io/)

A CLI that uses [`swagger-jsdoc`] and [`json-refs`] to generate an
OpenAPI/Swagger definition file from JSDoc-like comments, but allows for
arbitrary references and dereferences them in the output document. This is
particularly useful when working with certain consumers of OpenAPI that
don't parse json references.

## Installation

``` sh
npm install swagger-jsdoc-deref
```

## Usage

From a console using `npx`

``` sh
npx swagger-jsdoc-deref -d ./path/to/definition/file.js -o ./other-path/output.json
```

In your `package.json` file:

``` json
{
  "scripts": {
    "generate-docs": "swagger-jsdoc-deref -d ./path/to/definition/file.js -o ./other-path/output.json"
  }
}
```

### Additional API Snippets

You can also provide additional API snippets from yaml files by providing additional file arguments:

``` sh
npx swagger-jsdoc-deref -d ./path/to/definition/file.js -o ./other-path/output.json ./path/to/api/snippet.yaml
```

In your `package.json` file:

``` json
{
  "scripts": {
    "generate-docs": "swagger-jsdoc-deref -d ./path/to/definition/file.js -o ./other-path/output.json ./path/to/api/snippet.yaml"
  }
}
```

## Test

``` sh
npm test
```

## License

[MIT](LICENSE)

[`swagger-jsdoc`]: https://www.npmjs.com/package/swagger-jsdoc
[`json-refs`]: https://www.npmjs.com/package/json-refs
