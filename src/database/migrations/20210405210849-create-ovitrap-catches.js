module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ovitrap_catches', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`uuid_generate_v4()`)
      },
      number: {
        type: Sequelize.INTEGER
      },
      ovitrap_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'ovitraps', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('ovitrap_catches')
  }
}
