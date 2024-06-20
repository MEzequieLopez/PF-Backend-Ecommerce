const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // usuario al cual pertenece la orden
        customer_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        // id del template que se va a comprar.
        product_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        // ? esto debe ir ?
    //    order_date: {
    //        type: DataTypes.DATE,
    //        defaultValue: sequelize.NOW
    //    },

        // total_amount: ?

    });
};