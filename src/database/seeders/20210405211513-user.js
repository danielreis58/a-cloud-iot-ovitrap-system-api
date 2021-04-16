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
          name: "Administrador X",
          nickname: "Admin",
          email: "admin@empresax.com",
          password: pswAdmin,
          profile_id: 1,
          company_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Supervisor X",
          nickname: "Supv",
          email: "supv@empresax.com",
          password: pswSupv,
          profile_id: 2,
          company_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Agente X",
          nickname: "agent",
          email: "agent@empresax.com",
          password: pswAgnt,
          profile_id: 3,
          company_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Administrador Y",
          nickname: "Admin",
          email: "admin@empresay.com",
          password: pswAdmin,
          profile_id: 1,
          company_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Supervisor Y",
          nickname: "Supv",
          email: "supv@empresay.com",
          password: pswSupv,
          profile_id: 2,
          company_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Agente Y",
          nickname: "agent",
          email: "agent@empresay.com",
          password: pswAgnt,
          profile_id: 3,
          company_id: 2,
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
