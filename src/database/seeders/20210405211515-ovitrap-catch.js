module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'ovitrap_catches',
      [
        {
          number: 1,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 2,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 3,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 3,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 3,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 4,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 5,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 6,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 6,
          ovitrap_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 1,
          ovitrap_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 1,
          ovitrap_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 1,
          ovitrap_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          number: 1,
          ovitrap_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ovitrap_catches', null, {})
  }
}
