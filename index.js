const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config(); // Load environment variables

const { processNprSubject } = require('./dedupe'); // Your dedupe function

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to receive NPR email subject
app.post('/npr', async (req, res) => {
  console.log('Received POST /npr with body:', req.body);

  const subject = req.body.subject;

  if (!subject) {
    console.warn('Missing subject in request body');
    return res.status(400).json({ error: 'Missing subject' });
  }

  try {
    const result = await processNprSubject(subject);
    res.json(result);
  } catch (err) {
    console.error('Error processing subject:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`NPR backend running on port ${PORT}`);
});
