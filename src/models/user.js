import pkg from 'sequelize'

const { Model, DataTypes } = pkg

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        nickname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_id: DataTypes.INTEGER
      },
      {
        sequelize,
        modelName: 'User'
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Profile, {
      foreignKey: 'profile_id',
      as: 'profile'
    })
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    })
  }
}

export default User
