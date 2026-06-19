const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Serve static frontend files from current directory
app.use(express.static(__dirname));

app.post('/api/evaluate', async (req, res) => {
  const { systemPrompt, userMessage } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('Error: GROQ_API_KEY is not defined in the environment.');
    return res.status(500).json({ error: 'Groq API Key is not configured on the server. Please check your .env file.' });
  }

  const models = [
    'llama-3.3-70b-versatile',
    'llama-3.3-70b-specdec',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768'
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`Attempting evaluation with model: ${model}`);
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt + '\n\nIMPORTANT: Return ONLY valid JSON. No markdown fences, no explanation.' },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.2,
          max_tokens: 8192,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errorMsg = errData?.error?.message || errData?.error || `API responded with status ${response.status}`;
        console.warn(`Model ${model} failed:`, errorMsg);

        if (response.status === 429 || String(errorMsg).toLowerCase().includes('limit') || String(errorMsg).toLowerCase().includes('quota')) {
          lastError = errorMsg;
          continue; // Try next model on rate limit
        }

        return res.status(response.status).json({ error: errorMsg });
      }

      const data = await response.json();
      console.log(`Evaluation succeeded with model: ${model}`);
      return res.json(data);
    } catch (err) {
      console.warn(`Model ${model} failed with connection error:`, err.message);
      lastError = err.message;
    }
  }

  console.error('All Groq models failed.');
  res.status(429).json({ error: `All models rate-limited or failed. Last error: ${lastError}` });
});

// Catch-all route to serve index.html for any other requests (useful for SPA behavior, although not strictly needed here)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
