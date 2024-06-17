const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        review_content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        review_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        template_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};

/**
 * ejemplo de verificacion A NIVEL DE RUTAS a la hora de escribir una review: 
 *
router.post('/templates/:templateId/reviews', async (req, res) => {
    const { userId, templateId, rating, reviewContent } = req.body;


    const hasPurchased = await Order.findOne({
        where: {
            customer_id: userId,
            product_id: templateId
        }
    });

    if (!hasPurchased) {
        return res.status(403).json({ error: 'You must purchase the template before reviewing it.' });
    }

   
    try {
        const review = await Review.create({
            user_id: userId,
            template_id: templateId,
            rating,
            review_content: reviewContent
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review.' });
    }
});


O TAMBIEN SE PUEDE VERIFICAR A NIVEL DE BASE DE DATOS (esto tambien lo hace mas rapido): 
EJEMPLO : 



 */

