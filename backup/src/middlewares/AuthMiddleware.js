const jwt = require("jsonwebtoken");

const utils = require("../utils");

const authMiddleware = (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const { authorization } = req.headers;

    if (!authorization) {
      const { code, data } = utils.errorResponse({
        message: ["jwt required"],
        code: 401,
      });
      return res.status(code).send(data);
    }

    const token = authorization.replace("Bearer", "").trim();
    const data = jwt.verify(token, jwtSecret);
    const { id } = data;

    req.userId = id;

    return next();
  } catch (error) {
    const { code, data } = utils.errorResponse({ ...error, code: 401 });
    return res.status(code).send(data);
  }
};

module.exports = authMiddleware;
