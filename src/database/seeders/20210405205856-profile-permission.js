module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'profile_permissions',
      [
        {
          profile_id: 1,
          permission_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 1,
          permission_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 1,
          permission_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 1,
          permission_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 1,
          permission_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 2,
          permission_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 2,
          permission_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 2,
          permission_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          profile_id: 3,
          permission_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('profile_permissions', null, {})
  }
}
