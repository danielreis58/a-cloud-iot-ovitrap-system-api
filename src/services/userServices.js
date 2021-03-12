const UserView = require("../models/UserView");
const userRepository = require("../repositories/user");

const methods = {
  async index(page, limit) {
    const skip = limit * (page - 1);
    const users = await userRepository.index(skip, limit);

    return users;
  },

  async show(id) {
    const user = await userRepository.showById(id);

    if (!user) {
      throw {
        message: ["User not found"],
        code: 400,
      };
    }

    return user;
  },

  async store(email, password) {
    const userExists = await userRepository.showByEmail(email);

    if (userExists) {
      throw {
        message: ["Email already in use"],
        code: 409,
      };
    }

    const user = await userRepository.store(email, password);

    return user;
  },

  async update(id, email, password) {
    const userSelected = await userRepository.showById(id);

    if (!userSelected) {
      throw {
        message: ["User not found"],
        code: 400,
      };
    }

    const emailInUse = await userRepository.showByEmailWithDifferentId(
      id,
      email
    );

    if (emailInUse) {
      throw {
        message: ["Email already in use"],
        code: 400,
      };
    }

    const user = await userRepository.update(id, email, password);

    return user;
  },

  async delete(id) {
    const userSelected = await userRepository.showById(id);

    if (!userSelected) {
      throw {
        message: ["User not found"],
        code: 400,
      };
    }

    await userRepository.delete(id);

    return {};
  },
};

module.exports = methods;
