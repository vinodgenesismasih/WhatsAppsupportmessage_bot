// 实现回答缓存，减少API调用
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // 1小时缓存

async function getCachedAnswer(prompt) {
  const cacheKey = `answer:${md5(prompt)}`;
  let answer = cache.get(cacheKey);
  
  if (!answer) {
    answer = await deepseek.generateBookLikeAnswer(prompt);
    cache.set(cacheKey, answer);
  }
  
  return answer;
}