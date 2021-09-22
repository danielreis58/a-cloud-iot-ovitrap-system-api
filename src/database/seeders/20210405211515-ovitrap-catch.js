const today = new Date()
const startDate = new Date().setDate(today.getDate() - 30)

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'ovitrap_catches',
      [
        {
          number: 1,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 1),
          updated_at: new Date().setDate(startDate.getDate() + 1)
        },
        {
          number: 2,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 2),
          updated_at: new Date().setDate(startDate.getDate() + 2)
        },
        {
          number: 3,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 3),
          updated_at: new Date().setDate(startDate.getDate() + 3)
        },
        {
          number: 1,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 4),
          updated_at: new Date().setDate(startDate.getDate() + 4)
        },
        {
          number: 0,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 5),
          updated_at: new Date().setDate(startDate.getDate() + 5)
        },
        {
          number: 4,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 6),
          updated_at: new Date().setDate(startDate.getDate() + 6)
        },
        {
          number: 2,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 7),
          updated_at: new Date().setDate(startDate.getDate() + 7)
        },
        {
          number: 6,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 8),
          updated_at: new Date().setDate(startDate.getDate() + 8)
        },
        {
          number: 0,
          ovitrap_id: 1,
          created_at: new Date().setDate(startDate.getDate() + 9),
          updated_at: new Date().setDate(startDate.getDate() + 9)
        },
        {
          number: 1,
          ovitrap_id: 2,
          created_at: new Date().setDate(startDate.getDate() + 1),
          updated_at: new Date().setDate(startDate.getDate() + 1)
        },
        {
          number: 5,
          ovitrap_id: 2,
          created_at: new Date().setDate(startDate.getDate() + 2),
          updated_at: new Date().setDate(startDate.getDate() + 2)
        },
        {
          number: 0,
          ovitrap_id: 2,
          created_at: new Date().setDate(startDate.getDate() + 12),
          updated_at: new Date().setDate(startDate.getDate() + 12)
        },
        {
          number: 3,
          ovitrap_id: 2,
          created_at: new Date().setDate(startDate.getDate() + 13),
          updated_at: new Date().setDate(startDate.getDate() + 13)
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ovitrap_catches', null, {})
  }
}
