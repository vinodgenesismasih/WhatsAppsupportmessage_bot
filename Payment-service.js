const Razorpay = require('razorpay');

class PaymentService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }

  async createPaymentLink(amount, description, userId) {
    const paymentLink = await this.razorpay.paymentLink.create({
      amount: amount * 100, // 转换为分
      currency: "INR",
      description: description,
      customer: {
        name: "Chatbot User",
        contact: userId
      },
      notify: {
        sms: true,
        email: false
      },
      callback_url: `${process.env.BASE_URL}/payment/callback`,
      callback_method: "get"
    });

    return paymentLink.short_url;
  }

  async verifyPayment(paymentId) {
    const payment = await this.razorpay.payments.fetch(paymentId);
    return payment.status === 'captured';
  }
}