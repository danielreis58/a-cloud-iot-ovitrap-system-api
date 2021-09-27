const {
  profileAdmin,
  profileSupv,
  profileAgent,
  permissionCompany,
  permissionUser,
  permissionOvitrap
} = require('../uuid_seeders')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'profile_permissions',
      [
        {
          profile_id: profileAdmin,
          permission_id: permissionCompany
        },
        {
          profile_id: profileAdmin,
          permission_id: permissionUser
        },
        {
          profile_id: profileAdmin,
          permission_id: permissionOvitrap
        },
        {
          profile_id: profileSupv,
          permission_id: permissionUser
        },
        {
          profile_id: profileSupv,
          permission_id: permissionOvitrap
        },
        {
          profile_id: profileAgent,
          permission_id: permissionOvitrap
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('profile_permissions', null, {})
  }
}
