// src/pages/api/tone.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { text, tone } = req.body;

  if (!text || !tone) {
    return res.status(400).json({ message: 'Text and tone are required.' });
  }

  const systemPrompt = `Rephrase the following message in a ${tone} tone. Only return the transformed message with no explanations.`;

  try {
    const mistralRes = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-medium', // Or mistral-small, mistral-tiny depending on access
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = mistralRes.data.choices?.[0]?.message?.content?.trim();
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error('Mistral API Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to process tone adjustment.' });
  }
}
