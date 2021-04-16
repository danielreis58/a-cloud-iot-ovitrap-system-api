const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserView = require("../models/UserView");
const userRepository = require("../repositories/user");

const methods = {
  async authenticate(email, password) {
    const jwtSecret = process.env.JWT_SECRET;
    const user = await userRepository.showByEmail(email);

    if (!user) {
      throw {
        message: ["Invalid email or password"],
        code: 401,
      };
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw {
        message: ["Invalid email or password"],
        code: 401,
      };
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "8h" });

    const userView = new UserView(user.id, user.email, token);

    return userView;
  },
};

module.exports = methods;
