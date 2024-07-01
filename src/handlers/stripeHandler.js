const { paymentIntent, paymentSuccess, paymentCanceled } = require("../services/stripeService");

const newPayment = async (req, res) => {
  const userId = req.userId
  try {
    const response = await paymentIntent(userId);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
const success = async (req, res) => {
  const orderId = req.query.order_id;
  const userId = req.query.user_id;
  try {
    const response = await paymentSuccess(orderId, userId);
    res.send(response)
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
const cancel = async (req, res) => {
  const orderId = req.query.order_id;
  const userId = req.query.user_id;
  try {
    const response = await paymentCanceled(orderId, userId)
    res.send(response)
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
module.exports = {
  newPayment,
  success,
  cancel
}