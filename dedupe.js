const { sendSlackMessage } = require('./slack');

const processed = new Set();

function extractPracticeName(subject) {
  const match = subject.match(/\[(.*?)\]/);
  return match ? match[1].trim() : null;
}

async function processNprSubject(subject) {
  const practice = extractPracticeName(subject);
  if (!practice) throw new Error('Practice name not found in subject');

  const key = practice.toLowerCase();

  if (processed.has(key)) {
    return { message: 'Duplicate — already processed', practice };
  }

  processed.add(key);

  const text = `[${practice}] Got their 1st NPR — let’s call them as soon as possible!`;
  await sendSlackMessage(text);

  return { message: 'Slack sent', practice };
}

module.exports = { processNprSubject };
