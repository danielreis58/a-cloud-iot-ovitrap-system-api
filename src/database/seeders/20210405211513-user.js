const bcrypt = require("bcrypt");

const pswAdmin = bcrypt.hashSync("admin123", 8);
const pswSupv = bcrypt.hashSync("supv123", 8);
const pswAgnt = bcrypt.hashSync("agent123", 8);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          nickname: "Admin",
          email: "admin@email.com",
          password: pswAdmin,
          profile_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Supervisor",
          nickname: "Supv",
          email: "supv@email.com",
          password: pswSupv,
          profile_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Agente",
          nickname: "agent",
          email: "agent@email.com",
          password: pswAgnt,
          profile_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
