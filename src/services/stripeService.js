const paymentIntent = async (amount, userId, orderId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
        });
    
        // Guardar detalles del pago en la base de datos
        const payment = await Payment.create({
          userId,
          orderId,
          payment_status_id: paymentIntent.id,
          amount,
          currency: 'usd',
          status: 'pending',
        });
    return {
        clientSecret: paymentIntent.client_secret,
        status: 200
      }
      } catch (error) {
        return { error: error.message, status: 500 };
      }
}

module.exports = {
    paymentIntent
}