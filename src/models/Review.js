const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false

    },

    date: {
      type: DataTypes.DATE,
      allowNull: false

    },

  },
  {
    timestamps: false
  });
};

/*
module.exports = (sequelize) => {
  
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false

    },

    date: {
      type: DataTypes.DATE,
      allowNull: false

    },

    // cada review ha sido escrita(pertenece) a un usuario
    user_id: {  
      type: DataTypes.UUID,
      allowNull: false
    },

    // cada review en especifico pertenece a cierto template
    template_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'Esta es un review por defecto'
    },

  },
  {
    timestamps: false
  });
};

*/
