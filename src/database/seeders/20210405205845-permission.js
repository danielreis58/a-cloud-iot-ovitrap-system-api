module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          name: 'Rota 1',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Rota 2',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Rota 3',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Rota 4',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Rota 5',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('permissions', null, {})
  }
}
