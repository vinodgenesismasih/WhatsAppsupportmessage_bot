const axios = require('axios');

class DeepSeekClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.deepseek.com/v1/chat/completions';
  }

  async generateBookLikeAnswer(prompt) {
    const response = await axios.post(this.baseURL, {
      model: 'deepseek-chat',
      messages: [{
        role: 'user',
        content: `请以类似书本的详细、结构化方式回答：${prompt}`
      }],
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });

    return this.formatAsBook(response.data.choices[0].message.content);
  }

  formatAsBook(content) {
    // 转换为书本样式格式
    return `
📖 知识章节：${topic}
━━━━━━━━━━━━━━━━━━━━

${content}

━━━━━━━━━━━━━━━━━━━━
📚 相关延伸：
• 要点一：...
• 要点二：...
• 要点三：...
    `;
  }
}