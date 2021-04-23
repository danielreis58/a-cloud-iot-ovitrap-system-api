module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ovitrap_catches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ovitrap_catches')
  }
}