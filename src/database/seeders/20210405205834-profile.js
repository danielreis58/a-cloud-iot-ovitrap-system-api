const { profileAdmin, profileSupv, profileAgent } = require('../uuid_seeders')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'profiles',
      [
        {
          id: profileAdmin,
          name: 'Administrador'
        },
        {
          id: profileSupv,
          name: 'Supervisor'
        },
        {
          id: profileAgent,
          name: 'Agente'
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('profiles', null, {})
  }
}
