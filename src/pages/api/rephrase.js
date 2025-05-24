// pages/api/rephrase.js
export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistral-tiny', // or whichever model you want
      messages: [
        { role: 'system', content: 'You are a helpful assistant who rephrases text.' },
        { role: 'user', content: `Rephrase this: ${text}` }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
