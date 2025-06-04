const axios = require('axios');
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendSlackMessage(text) {
  if (!SLACK_WEBHOOK_URL) throw new Error('Missing SLACK_WEBHOOK_URL');
  await axios.post(SLACK_WEBHOOK_URL, { text });
}

module.exports = { sendSlackMessage };