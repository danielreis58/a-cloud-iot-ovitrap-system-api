import pkg from "sequelize";
const { Model, DataTypes } = pkg;

class Permission extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Permission",
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Profile, {
      foreignKey: "permission_id",
      through: "ProfilePermission",
      as: "profile",
    });
  }
}

export default Permission;
