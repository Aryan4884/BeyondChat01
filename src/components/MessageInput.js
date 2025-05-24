import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function MessageInput({ onSend, value = '', onChange, darkMode = false }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    if (onChange) onChange('');
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full border rounded-md overflow-hidden shadow-sm">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
        className={`flex-1 px-4 py-2 text-sm outline-none 
          ${darkMode
            ? 'bg-gray-800 text-white placeholder-gray-400'
            : 'bg-white text-black placeholder-gray-500'}
        `}
      />
      <button
        type="submit"
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition border-l cursor-pointer
          ${darkMode
            ? 'bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800'
            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'}
        `}
      >
        Send
        <ChevronDown size={14} />
      </button>
    </form>
  );
}
