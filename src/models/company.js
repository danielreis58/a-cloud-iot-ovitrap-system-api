import pkg from 'sequelize';

const { Model, DataTypes } = pkg;

class Company extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                document: DataTypes.STRING,
                site: DataTypes.STRING,
                cep: DataTypes.STRING,
                address: DataTypes.STRING,
                number: DataTypes.INTEGER,
                neighborhood: DataTypes.STRING,
                city: DataTypes.STRING,
                state: DataTypes.STRING,
                telephone: DataTypes.STRING,
                note: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'Company',
            },
        );
    }

    static associate(models) {

    }
}

export default Company;
