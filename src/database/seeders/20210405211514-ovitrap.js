const {
  companyX,
  companyY,
  userAdminX,
  userAgentX,
  ovitrap1X,
  ovitrap1Y,
  ovitrap2X
} = require('../uuid_seeders')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'ovitraps',
      [
        {
          id: ovitrap1X,
          name: 'Armadilha X 1',
          latitude: -22.432933,
          longitude: -45.455328,
          user_id: userAdminX,
          company_id: companyX
        },
        {
          id: ovitrap2X,
          name: 'Armadilha X 2',
          latitude: -22.419958,
          longitude: -45.464958,
          user_id: userAgentX,
          company_id: companyX
        },
        {
          id: ovitrap1Y,
          name: 'Armadilha Y 1',
          latitude: -22.416789,
          longitude: -45.447095,
          user_id: userAdminX,
          company_id: companyY
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ovitraps', null, {})
  }
}
