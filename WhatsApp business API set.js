# 使用官方WhatsApp Cloud API
npm install whatsapp-cloud-api

# 配置
const { WhatsAppAPI } = require('whatsapp-cloud-api');
const whatsapp = new WhatsAppAPI({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  senderPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID
});