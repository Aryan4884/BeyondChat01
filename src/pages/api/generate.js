// src/pages/api/generate.js
import { generateStaticSuggestions } from "@/utils/suggest";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  const suggestions = generateStaticSuggestions(prompt);
  res.status(200).json({ suggestions });
}
