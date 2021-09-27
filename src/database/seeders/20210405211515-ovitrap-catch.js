const { ovitrap1X, ovitrap2X, ovitrap1Y } = require('../uuid_seeders')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'ovitrap_catches',
      [
        {
          number: 1,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 30)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 30))
        },
        {
          number: 2,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 29)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 29))
        },
        {
          number: 3,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 28)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 28))
        },
        {
          number: 1,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 27)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 27))
        },
        {
          number: 0,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 26)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 26))
        },
        {
          number: 4,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 25)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 25))
        },
        {
          number: 2,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 24)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 24))
        },
        {
          number: 6,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 23)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 23))
        },
        {
          number: 0,
          ovitrap_id: ovitrap1X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 22)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 22))
        },
        {
          number: 1,
          ovitrap_id: ovitrap2X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 30)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 30))
        },
        {
          number: 5,
          ovitrap_id: ovitrap2X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 29)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 29))
        },
        {
          number: 0,
          ovitrap_id: ovitrap2X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 28)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 28))
        },
        {
          number: 3,
          ovitrap_id: ovitrap2X,
          created_at: new Date(new Date().setDate(new Date().getDate() - 27)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 27))
        },
        {
          number: 3,
          ovitrap_id: ovitrap1Y,
          created_at: new Date(new Date().setDate(new Date().getDate() - 10)),
          updated_at: new Date(new Date().setDate(new Date().getDate() - 10))
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ovitrap_catches', null, {})
  }
}
