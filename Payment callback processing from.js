// webhook-handler.js
app.post('/payment/webhook', async (req, res) => {
  const event = req.body;
  
  // Razorpay/Stripe签名验证
  if (verifySignature(req.headers, req.rawBody)) {
    if (event.event === 'payment.captured') {
      const paymentId = event.payload.payment.entity.id;
      const userId = event.payload.payment.entity.notes.user_id;
      
      // 通知用户支付成功
      await sendPaymentSuccessMessage(userId);
      
      // 解锁高级功能或提供服务
      await unlockPremiumFeatures(userId);
    }
  }
  
  res.json({ received: true });
});