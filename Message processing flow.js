// message-processor.js
const DeepSeekClient = require('./deepseek-client');
const PaymentService = require('./payment-service');

async function processMessage(text, platform, userId) {
  // 检测支付意图
  if (text.toLowerCase().includes('支付') || text.toLowerCase().includes('pay')) {
    const paymentService = new PaymentService();
    const paymentLink = await paymentService.createPaymentLink(
      99, // 金额
      "AI服务订阅", // 描述
      userId
    );
    
    return `请点击链接完成支付：${paymentLink}\n\n支付完成后，我将为您提供完整的服务。`;
  }
  
  // 正常AI回答
  const deepseek = new DeepSeekClient(process.env.DEEPSEEK_API_KEY);
  return await deepseek.generateBookLikeAnswer(text);
}