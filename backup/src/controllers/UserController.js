const userServices = require("../services/userServices");
const utils = require("../utils");

const UserController = () => ({
  async index(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      const data = await userServices.index(page, limit);

      return res.send(utils.successResponse(data));
    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const data = await userServices.show(id);

      return res.send(utils.successResponse(data));
    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  },

  async store(req, res) {
    try {
      const { email, password } = req.body;
      const data = await userServices.store(email, password);

      return res.status(201).send(utils.successResponse(data));
    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const data = await userServices.update(id, email, password);

      return res.send(utils.successResponse(data));
    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await userServices.delete(id);

      return res.send(utils.successResponse(data));
    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  },
});

module.exports = UserController;
