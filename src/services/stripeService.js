const { OrderPayment } = require("../db")
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (userId) => {
  try {
    const userCart = await Cart.findOne({ where: { user_id: userId }, include: Template });
    const order = await Order.create({
      user_id: userId,
      total_amount: userCart.Templates.reduce((total, template) => total + template.price, 0),
      status: 'pending'
    });

    await order.addTemplates(userCart.Templates);

    const lineItems = userCart.Templates.map(template => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: template.title,
        },
        unit_amount: template.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: 'http://localhost:3001/cancel',
    });
    order.stripe_session_id = session.id;
    await order.save();

    return { id: session.id };
  } catch (error) {
    return error
  }

}

module.exports = {
  paymentIntent
}