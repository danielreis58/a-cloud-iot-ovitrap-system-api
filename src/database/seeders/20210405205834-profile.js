module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'profiles',
      [
        {
          name: 'Administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Supervisor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Agente',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('profiles', null, {});
  },
};
