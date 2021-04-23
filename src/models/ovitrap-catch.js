import pkg from 'sequelize'

const { Model, DataTypes } = pkg

class OvitrapCatch extends Model {
  static init(sequelize) {
    super.init(
      {
        number: DataTypes.INTEGER
      },
      {
        sequelize,
        modelName: 'OvitrapCatch'
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Ovitrap, {
      foreignKey: 'ovitrap_id',
      as: 'ovitrap'
    })
  }
}

export default OvitrapCatch
