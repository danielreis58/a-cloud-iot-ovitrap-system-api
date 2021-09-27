const bcrypt = require('bcrypt')
const {
  profileAdmin,
  companyX,
  profileSupv,
  profileAgent,
  companyY,
  userAdminX,
  userSupvX,
  userAgentX,
  userAdminY,
  userSupvY,
  userAgentY
} = require('../uuid_seeders')

const pswAdmin = bcrypt.hashSync('admin123', 8)
const pswSupv = bcrypt.hashSync('supv123', 8)
const pswAgnt = bcrypt.hashSync('agent123', 8)

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: userAdminX,
          name: 'Administrador X',
          nickname: 'Admin',
          email: 'admin@empresax.com',
          password: pswAdmin,
          profile_id: profileAdmin,
          company_id: companyX
        },
        {
          id: userSupvX,
          name: 'Supervisor X',
          nickname: 'Supv',
          email: 'supv@empresax.com',
          password: pswSupv,
          profile_id: profileSupv,
          company_id: companyX
        },
        {
          id: userAgentX,
          name: 'Agente X',
          nickname: 'agent',
          email: 'agent@empresax.com',
          password: pswAgnt,
          profile_id: profileAgent,
          company_id: companyX
        },
        {
          id: userAdminY,
          name: 'Administrador Y',
          nickname: 'Admin',
          email: 'admin@empresay.com',
          password: pswAdmin,
          profile_id: profileAdmin,
          company_id: companyY
        },
        {
          id: userSupvY,
          name: 'Supervisor Y',
          nickname: 'Supv',
          email: 'supv@empresay.com',
          password: pswSupv,
          profile_id: profileSupv,
          company_id: companyY
        },
        {
          id: userAgentY,
          name: 'Agente Y',
          nickname: 'agent',
          email: 'agent@empresay.com',
          password: pswAgnt,
          profile_id: profileAgent,
          company_id: companyY
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
