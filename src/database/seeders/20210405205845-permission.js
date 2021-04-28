module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          name: 'Company',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'User',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Ovitrap',
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
