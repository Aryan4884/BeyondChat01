import { useEffect, useRef } from 'react';

export default function ChatWindow({ conversation, onAskFin }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  if (!conversation) return null;

  const userAvatar = conversation.avatar || 'https://i.pravatar.cc/40?img=13';
  const agentAvatar = 'https://i.pravatar.cc/40?img=1';

  return (
    <div className="p-4 space-y-4 max-w-full md:max-w-3xl mx-auto overflow-x-hidden">
      {conversation.messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-2 group flex-wrap w-full ${
            msg.sender === 'agent' ? 'justify-end' : 'justify-start'
          }`}
        >
          {/* Avatar */}
          {msg.sender === 'user' && (
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
          )}

          {/* Message bubble */}
          <div
            className={`relative p-3 rounded-lg shadow text-sm whitespace-pre-wrap break-words max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] text-left
              ${
                msg.sender === 'agent'
                  ? msg.fromAI
                    ? 'bg-purple-300 text-purple-900 border border-purple-500'
                    : 'bg-purple-200 text-purple-900'
                  : 'bg-gray-300 text-gray-900'
              }`}
          >
            {msg.text}
            <div className="text-xs text-gray-500 mt-1 text-left">{msg.time}</div>

            {/* Ask to Fin button */}
            {msg.sender === 'user' && (
              <button
                onClick={() => onAskFin?.(msg.text)}
                className="absolute right-1 top-1 text-[10px] bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300 hidden group-hover:block"
              >
                Ask to Fin
              </button>
            )}
          </div>

          {msg.sender === 'agent' && (
            <img
              src={agentAvatar}
              alt="Agent Avatar"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
