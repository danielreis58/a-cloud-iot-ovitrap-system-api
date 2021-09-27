module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blacklists', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`uuid_generate_v4()`)
      },
      token: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()')
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('blacklists')
  }
}
