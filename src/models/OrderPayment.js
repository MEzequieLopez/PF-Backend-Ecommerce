const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orderPayment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        // Payment_ID <-- del modelo entidad relacion. <== referencia a Order(id)
        order_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        // referencia a la tabla PaymentStatus(id) (puede ser Pending o Fulfilled)
        payment_status_id: {
            type: DataTypes.UUID,
            allowNull: false
        },

        // 
        payment_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
            allowNull: false
        },

        // esta seria la suma total de la compra, ejemplo si el usuario compra 2 templates 
        // diferentes al mismo tiempo, ese total iria aqui.
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
    
    }) 
};

