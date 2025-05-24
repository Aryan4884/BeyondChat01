import { useEffect, useRef, useState } from 'react';

export default function ChatWindow({ conversation, onAskFin }) {
  const endRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  if (!conversation) return null;

  const userAvatar = conversation.avatar || 'https://i.pravatar.cc/40?img=13';
  const agentAvatar = 'https://i.pravatar.cc/40?img=1';

  return (
    <div className="p-4 space-y-6 max-w-full md:max-w-3xl mx-auto overflow-visible">
      {conversation.messages.map((msg, idx) => {
        const isUser = msg.sender === 'user';
        const isAgent = msg.sender === 'agent';

        return (
          <div
            key={idx}
            className={`relative flex items-start gap-2 w-full ${
              isAgent ? 'justify-end' : 'justify-start'
            }`}
            onMouseEnter={() => {
              if (isUser) {
                clearTimeout(hideTimer.current);
                setHoveredIdx(idx);
              }
            }}
            onMouseLeave={() => {
              if (isUser) {
                hideTimer.current = setTimeout(() => setHoveredIdx(null), 300);
              }
            }}
          >
            {/* Avatar */}
            {isUser && (
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}

            {/* Wrapper for message + tooltip */}
            <div className="relative max-w-full">
              {/* Ask Fin Copilot Tooltip */}
              {isUser && hoveredIdx === idx && (
                <div
                  className="absolute -top-12 left-0 z-10 translate-y-[-2px] mt-1.5" 
                  onMouseEnter={() => clearTimeout(hideTimer.current)}
                  onMouseLeave={() => {
                    hideTimer.current = setTimeout(() => setHoveredIdx(null), 600);
                  }}
                >
                  <button
                    onClick={() => {
                      onAskFin?.(msg.text);
                      setHoveredIdx(null);
                    }}
                    className="flex items-center gap-2 mt-4 bg-white text-sm text-gray-800 px-3 py-1 rounded-full shadow border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <img src="/AI.png" alt="AI Icon" className="w-4 h-4" />
                    Ask Fin Copilot
                  </button>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`relative p-4 rounded-lg shadow text-sm whitespace-pre-wrap break-words text-left inline-block max-w-full ${
                  isUser ? 'cursor-pointer' : ''
                }
                ${
                  isAgent
                    ? msg.fromAI
                      ? 'bg-purple-300 text-purple-900 border border-purple-500'
                      : 'bg-purple-200 text-purple-900'
                    : 'bg-gray-300 text-gray-900'
                }`}
              >
                {msg.text}
                <div className="text-xs text-gray-500 mt-2 text-left">{msg.time}</div>
              </div>
            </div>

            {/* Agent Avatar */}
            {isAgent && (
              <img
                src={agentAvatar}
                alt="Agent Avatar"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
