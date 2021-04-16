const authServices = require("../services/authService");
const utils = require("../utils");

const AuthController = () => ({
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const data = await authServices.authenticate(email, password);

      return res.send(utils.successResponse(data));
    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  },
});

module.exports = AuthController;
