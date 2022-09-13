const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

sequelize.define('profiles', {


id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
    
},
super: {

    type: DataTypes.BOOLEAN,
    allowNull: false
},

products: {
  
    type: DataTypes.BOOLEAN,
    allowNull: false
},
comments: {

    
    type: DataTypes.BOOLEAN,
    allowNull: false

},

users: {
  
    type: DataTypes.BOOLEAN,
    allowNull: false
},
paymentmethod: {
  
    type: DataTypes.BOOLEAN,
    allowNull: false

},
price: {

    type: DataTypes.BOOLEAN,
    allowNull: false
},


})}