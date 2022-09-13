const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

sequelize.define('products', {


id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    
},
clotheType: {

    type: DataTypes.STRING,
    allowNull: false
},

brand: {
    type: DataTypes.STRING,
    allowNull: false
},
name: {

    type: DataTypes.STRING,
    allowNull:false


},

gender: {

    type: DataTypes.STRING,
    allowNull: false
},
sport: {
    type: DataTypes.STRING,
    allowNull: false

},
collection: {

    type: DataTypes.STRING,
    allowNull: false
},
color: {
    type: DataTypes.STRING,
    allowNull: false
},
size:{
    type: DataTypes.STRING,
    allowNull: false
},
image:{
    type: DataTypes.STRING,
    allowNull: false
},
stock:{

    type: DataTypes.INTEGER,
    allowNull: false

},
price: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
promotion:{
    type: DataTypes.DECIMAL,
    allowNull: false
},
date:{
    type: DataTypes.DATE,
    allowNull: false
},
available:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
},


})}