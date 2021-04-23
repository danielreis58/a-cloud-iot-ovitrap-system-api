module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'ovitraps',
      [
        {
          name: 'Armadilha X 1',
          latitude: -22.432933,
          longtude: -45.455328,
          user_id: '1',
          company_id: '1',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Armadilha X 2',
          latitude: -22.419958,
          longtude: -45.464958,
          user_id: '3',
          company_id: '1',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Armadilha Y 1',
          latitude: -22.416789,
          longtude: -45.447095,
          user_id: '1',
          company_id: '2',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ovitraps', null, {})
  }
}
