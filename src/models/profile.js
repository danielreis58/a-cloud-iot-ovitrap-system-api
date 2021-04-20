import pkg from 'sequelize';

const { Model, DataTypes } = pkg;

class Profile extends Model {
	static init(sequelize) {
		super.init(
			{
				name: DataTypes.STRING,
			},
			{
				sequelize,
				modelName: 'Profile',
			},
		);
	}

	static associate(models) {
		this.belongsToMany(models.Permission, {
			foreignKey: 'profile_id',
			through: 'ProfilePermission',
			as: 'permission',
		});
	}
}

export default Profile;
