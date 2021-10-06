import pkg from 'sequelize'

const { Model, DataTypes } = pkg

class Ovitrap extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        latitude: DataTypes.INTEGER,
        longitude: DataTypes.INTEGER
      },
      {
        sequelize,
        modelName: 'Ovitrap'
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    })
  }
}

export default Ovitrap
