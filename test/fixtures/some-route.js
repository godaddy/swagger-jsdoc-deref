module.exports = function (app) {
  /**
   * @swagger
   *
   * parameters:
   *   Bar:
   *     in: path
   *     name: bar
   *     schema:
   *       type: string
   *     description: Type of bar
   * responses:
   *   Normal:
   *     200:
   *       description: Here's the thing you wanted
   *     403:
   *       description: How dare you
   *     404:
   *       description: I've never heard of that

   * /foo/{bar}:
   *   get:
   *     parameters:
   *       - $ref: '#/parameters/Bar'
   *     responses:
   *       $ref: '#/responses/Normal'
   */
  app.routes.get('/foo/:bar', function (req, res, next) {
    if (req && res) {
      next();
      return;
    }
  });
};
