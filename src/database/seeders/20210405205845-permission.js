const {
  permissionCompany,
  permissionUser,
  permissionOvitrap
} = require('../uuid_seeders')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          id: permissionCompany,
          name: 'Company'
        },
        {
          id: permissionUser,
          name: 'User'
        },
        {
          id: permissionOvitrap,
          name: 'Ovitrap'
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('permissions', null, {})
  }
}
