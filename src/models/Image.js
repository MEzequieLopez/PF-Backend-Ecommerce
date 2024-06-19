const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('image', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        // aqui va la URL de la imagen.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Default Name', 
        },
        // template_id: {type: UUID4, integer}
    });
};
