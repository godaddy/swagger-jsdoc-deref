# swagger-jsdoc-deref

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
    "generate-docs": "swagger-jsdoc-deref -d ./path/to/definition/file.js -o ./other-path/"
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
