module.exports = {
  openapi: '3.0.2',
  info: {
    title: 'Random Fixture',
    version: '1.2.3',
    description: 'This is not the greatest package, it\'s just a fixture'
  },
  apis: [
    './test/fixtures/some-route.js'
  ]
};
