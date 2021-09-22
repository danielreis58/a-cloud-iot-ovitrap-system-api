module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ovitrap_catches', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`uuid_generate_v4()`)
      },
      number: {
        type: Sequelize.INTEGER
      },
      ovitrap_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ovitraps', key: 'id' },
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
    await queryInterface.dropTable('ovitrap_catches')
  }
}
