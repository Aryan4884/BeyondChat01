// src/components/CustomerInput.js
import { useState } from 'react';

export default function CustomerInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Customer Simulator</h2>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a customer query..."
          className="flex-1 resize-none p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Send</button>
      </form>
    </div>
  );
}
