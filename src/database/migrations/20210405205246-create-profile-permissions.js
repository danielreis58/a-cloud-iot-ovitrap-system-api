module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profile_permissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`uuid_generate_v4()`)
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'permissions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('now()')
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('profile_permissions')
  }
}
