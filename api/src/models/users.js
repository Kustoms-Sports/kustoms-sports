const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nickname:{
           type: DataTypes.STRING,
           allowNull: false 
        },
        name:{
           type: DataTypes.STRING,
           allowNull: false 
        },
        surname:{
           type: DataTypes.STRING,
           allowNull: false 
        },
        email:{
           type: DataTypes.STRING,
           allowNull: false 
        },
        birthdate:{
           type: DataTypes.DATE,
           allowNull: false 
        },
        country:{
           type: DataTypes.STRING,
           allowNull: false 
        },
        fidelity:{
           type: DataTypes.DECIMAL,
           allowNull: false 
        },
        visited:{
           type: DataTypes.ARRAY(DataTypes.STRING),
           allowNull: false 
        },
        available:{
           type: DataTypes.BOOLEAN,
           defaultValue: true,
           allowNull: false 
        },
    })
}