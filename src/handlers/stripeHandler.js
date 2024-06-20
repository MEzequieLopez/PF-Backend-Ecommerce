const { paymentIntent } = require("../services/stripeService");

const newPayment = async (req, res) => {
    const { amount, orderId} = req.body;
    const userId = req.userId
    try {
      console.log(userId);
        const response = await paymentIntent(amount, userId, orderId);
        res.status(response.status).send(response);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
      }
}

module.exports = {
    newPayment
}