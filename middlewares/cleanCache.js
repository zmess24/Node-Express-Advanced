const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    // Wait until request handler is complete.
    await next();

    clearHash(req.user.id);
}