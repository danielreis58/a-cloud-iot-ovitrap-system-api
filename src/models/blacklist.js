import pkg from 'sequelize';

const { Model, DataTypes } = pkg;

class Blacklist extends Model {
    static init(sequelize) {
        super.init(
            { token: DataTypes.STRING },
            {
                sequelize,
                modelName: 'Blacklist',
            },
        );
    }

    static associate(models) {
        // define association here
    }
}

export default Blacklist;
