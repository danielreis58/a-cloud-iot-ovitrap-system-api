// const { getRepository, Not } =require( "typeorm");
const User = require("../models/User");
const UserView = require("../models/UserView");

const methods = () => {
  // const repository = getRepository(User);
  return {
    async index(skip, take) {
      const users = await repository.find({ skip, take });
      const usersView = users.map((item) => new UserView(item.id, item.email));

      return usersView;
    },

    async showById(id) {
      const user = await repository.findOne({ where: { id } });
      if (user) return new UserView(user.id, user.email);

      return user;
    },

    async showByEmail(email) {
      return await repository.findOne({ where: { email } });
    },

    async showByEmailWithDifferentId(id, email) {
      // return await repository.findOne({ where: { email, id: Not(id) } });
    },

    async store(email, password) {
      const user = repository.create({ email, password });
      await repository.save(user);

      const userView = new UserView(user.id, user.email);
      return userView;
    },

    async update(id, email, password) {
      const user = new User(id, email, password);
      await repository.save(user);

      const userView = new UserView(user.id, user.email);
      return userView;
    },

    async delete(id) {
      return await repository.delete({ id });
    },
  };
};

module.exports = methods;
