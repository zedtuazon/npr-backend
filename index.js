const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config(); // Load .env file

const { processNprSubject } = require('./dedupe'); // Import function

app.use(express.json()); // Parse JSON body

// Handle POST requests to /npr
app.post('/npr', async (req, res) => {
  const subject = req.body.subject;

  // Validate subject
  if (!subject) {
    return res.status(400).json({ error: 'Missing subject' });
  }

  try {
    const result = await processNprSubject(subject);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`NPR backend running on port ${PORT}`);
});
