export default function AISuggestions({ suggestions = [], setDraft }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-gray-400 italic">No suggestions yet</p>
      ) : (
        <ul className="space-y-3">
          {suggestions.map((text, idx) => (
            <li
              key={idx}
              className="bg-gray-100 dark:bg-gray-700 dark:text-gray-100 p-3 rounded flex justify-between items-start shadow"
            >
              <span className="text-sm flex-1 pr-2">{text}</span>
              <button
                className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => setDraft(text)}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
