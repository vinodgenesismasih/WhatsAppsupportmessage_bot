const express = require('express');
const { WhatsAppBot } = require('./whatsapp-bot');
const { TelegramBot } = require('./telegram-bot');
const { processMessage } = require('./message-processor');

const app = express();
app.use(express.json());

// 消息处理路由
app.post('/webhook/whatsapp', async (req, res) => {
  const message = req.body.messages[0];
  const response = await processMessage(message.text, 'whatsapp', message.from);
  await WhatsAppBot.sendMessage(message.from, response);
  res.sendStatus(200);
});

app.post('/webhook/telegram', async (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;
  const response = await processMessage(text, 'telegram', chatId);
  await TelegramBot.sendMessage(chatId, response);
  res.sendStatus(200);
});