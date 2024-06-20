const { paymentIntent } = require("../services/stripeService");

const newPayment = async (req, res) => {
    const { amount, userId, orderId } = req.body;
    try {
        const response = await paymentIntent(amount, userId, orderId);
        res.status(response.status).send(response);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}

module.exports = {
    newPayment
}