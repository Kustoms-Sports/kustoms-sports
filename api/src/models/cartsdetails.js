const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

sequelize.define('cartsdetails', {


id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true ,
    allowNull: false
    
},
product_id: {

    type: DataTypes.INTEGER ,
    
    allowNull: false
},

finalprice: {
  
    type: DataTypes.DECIMAL,
    allowNull: false
},

})}