const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('image', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
{
  timestamps: false
});
};