const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('paymentStatus', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        // pending, fulfilled
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true // <-- ejemplo: Pending no podria existir 2 veces.
        },
    });
};


/**
 * con esta tabla se pueden tener fltros como:
 * await PaymentStatus.findAll({where: {status: 'pending'}}) <-- podria ser una ruta admin.
 */