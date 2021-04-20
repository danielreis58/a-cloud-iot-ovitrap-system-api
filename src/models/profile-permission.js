import pkg from 'sequelize';

const { Model, DataTypes } = pkg;

class ProfilePermission extends Model {
    static init(sequelize) {
        super.init(
            {
                profile_id: DataTypes.INTEGER,
                permission_id: DataTypes.INTEGER,
            },
            {
                sequelize,
                modelName: 'ProfilePermission',
            },
        );
    }

    static associate(models) {

    }
}

export default ProfilePermission;
