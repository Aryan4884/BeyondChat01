import { useEffect, useState } from 'react';
import ChatWindow from '@/components/ChatWindow';
import AISuggestions from '@/components/AISuggestions';
import MessageInput from '@/components/MessageInput';
import CustomerInput from '@/components/CustomerInput';
import { generateStaticSuggestions } from '@/utils/suggest';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [agentReply, setAgentReply] = useState('');
  const [lastUserPrompt, setLastUserPrompt] = useState('');
  const [aiThreads, setAiThreads] = useState({});
  const [tone, setTone] = useState('neutral');
  const [aiAction, setAiAction] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const agentAvatar = 'https://i.pravatar.cc/40?img=1';

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        name: 'Luis Easton',
        avatar: 'https://i.pravatar.cc/40?img=3',
        messages: [
          { sender: 'user', text: 'How can I reset my password?', time: '10:00 AM' },
          { sender: 'agent', text: 'You can reset your password from the login page.', time: '10:01 AM' }
        ]
      },
      {
        id: 2,
        name: 'Ivan Doe',
        avatar: 'https://i.pravatar.cc/40?img=6',
        messages: [
          { sender: 'user', text: 'Can I cancel my subscription?', time: '09:45 AM' }
        ]
      },
      {
        id: 3,
        name: 'Mia Johnson',
        avatar: 'https://i.pravatar.cc/40?img=8',
        messages: [
          { sender: 'user', text: 'How do I get a refund?', time: '09:30 AM' }
        ]
      },
      {
        id: 4,
        name: 'Emma Blake',
        avatar: 'https://i.pravatar.cc/40?img=12',
        messages: [
          { sender: 'user', text: 'Where can I find the invoice for last month?', time: '08:50 AM' },
          { sender: 'agent', text: 'You can view all invoices in the billing section of your account.', time: '08:52 AM' }
        ]
      }
    ];
    setConversations(dummy);
    setSelected(dummy[0]);
    setLastUserPrompt(dummy[0].messages[dummy[0].messages.length - 1].text);
  }, []);

  const currentThread = selected ? aiThreads[selected.id] || [] : [];

  const handleCustomerPrompt = (text) => {
    if (!selected) return;

    const msg = {
      sender: 'user',
      text: String(text),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = {
      ...selected,
      messages: [...selected.messages, msg]
    };

    setSelected(updated);
    setLastUserPrompt(msg.text);
    setConversations(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    );
  };

  const handleRephrase = async () => {
    if (!agentReply.trim()) return;
    try {
      const res = await fetch('/api/rephrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: agentReply })
      });
      const data = await res.json();
      setAgentReply(data.result || agentReply);
    } catch (err) {
      console.error('Failed to rephrase:', err);
    }
  };

  const handleToneChange = async (newTone) => {
    setTone(newTone);
    if (!agentReply.trim()) return;
    try {
      const res = await fetch('/api/tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: agentReply, tone: newTone })
      });
      const data = await res.json();
      setAgentReply(data.response || agentReply);
    } catch (err) {
      console.error('Failed to adjust tone:', err);
    }
  };

  const handleAgentSendToCustomer = async () => {
    const msgText = (agentReply || '').toString().trim();
    if (!selected || !msgText) return;
    const msg = {
      sender: 'agent',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = {
      ...selected,
      messages: [...selected.messages, msg]
    };
    setSelected(updated);
    setAgentReply('');
    setConversations(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleAskFin = (text) => {
    setDraftMessage(text);
  };

  const handleAgentAskAI = async () => {
    if (!draftMessage.trim() || !selected) return;
    const userMsg = {
      sender: 'agent',
      text: draftMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const aiSuggestions = generateStaticSuggestions(draftMessage);
    const suggestionMessages = aiSuggestions.map(suggestion => ({
      sender: 'ai',
      text: suggestion,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setAiThreads(prev => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), userMsg, ...suggestionMessages]
    }));
  };

  const handleCopyAIResponse = (text) => {
    setAgentReply(text);
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen font-inter transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100' : 'bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-800'}`}>
      {/* Inbox */}
      <div className={`w-full md:w-[22%] p-4 shadow-inner ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-blue-100'}`}>
        <h3 className="font-semibold text-md mb-4">Your Inbox</h3>
        <ul className="space-y-3">
          {conversations.map(conv => (
            <li
              key={conv.id}
              onClick={() => setSelected(conv)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selected?.id === conv.id ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100' : darkMode ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-blue-50'}`}
            >
              <img src={conv.avatar} alt={conv.name} className="w-8 h-8 rounded-full" />
              <div className="text-sm">
                <div className="font-semibold">{conv.name}</div>
                <div className="text-xs line-clamp-1">{conv.messages.at(-1)?.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-full md:w-[56%] flex flex-col">
        <div className="px-6 py-3 font-semibold flex justify-between items-center" style={{ background: darkMode ? '#1f2937' : '#f0f4f8' }}>
          <span>{selected?.name}</span>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 transition cursor-pointer" aria-label="Toggle Dark Mode">
            {darkMode ? <Sun size={18} className="text-white-400" /> : <Moon size={18} className="text-gray-100" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ChatWindow conversation={selected} onAskFin={handleAskFin} />
        </div>
        <div className="px-6 py-4" style={{ background: darkMode ? '#2d3748' : '#f0f4f8' }}>
          <div className="relative">
          <button
            onClick={() => setAiAction(prev => (prev ? '' : 'open'))}
            className="px-3 py-1 mb-2 rounded-full bg-blue-200 text-gray-800 hover:bg-blue-300 transition cursor-pointer"
          >
            AI
          </button>
          {aiAction && (
            <div className={`absolute bottom-full mb-2 w-32 z-50 left-0 rounded shadow-md text-sm border 
  ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-200'}`}>

  <button
    onClick={() => { setAiAction(''); handleToneChange('neutral'); }}
    className={`block w-full px-4 py-2 text-left transition cursor-pointer 
      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    Tone: Neutral
  </button>

  <button
    onClick={() => { setAiAction(''); handleToneChange('friendly'); }}
    className={`block w-full px-4 py-2 text-left transition cursor-pointer
      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    Tone: Friendly
  </button>

  <button
    onClick={() => { setAiAction(''); handleToneChange('formal'); }}
    className={`block w-full px-4 py-2 text-left transition cursor-pointer 
      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    Tone: Formal
  </button>

  <button
    onClick={() => { setAiAction(''); handleToneChange('apologetic'); }}
    className={`block w-full px-4 py-2 text-left transition cursor-pointer
      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    Tone: Apologetic
  </button>

  <button
    onClick={() => { setAiAction(''); handleToneChange('confident'); }}
    className={`block w-full px-4 py-2 text-left transition cursor-pointer 
      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    Tone: Confident
  </button>

  <button
    onClick={() => { setAiAction(''); handleRephrase(); }}
    className={`block w-full px-4 py-2 text-left transition cursor-pointer
      ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
  >
    Rephrase
  </button>
</div>

          )}
        </div>
        <MessageInput value={agentReply || ''} onChange={(val) => setAgentReply(val || '')} onSend={handleAgentSendToCustomer} darkMode={darkMode} />
        </div>
        
      </div>

      {/* AI Copilot */}
      <div className={`w-full md:w-[22%] flex flex-col ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-br from-white to-blue-100 text-gray-800'}`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-md font-semibold mb-2">AI Copilot</h2>
          {currentThread.length === 0 ? (
            <div style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }} className="flex flex-col items-center space-y-2 mt-50">
              <img src="/AI.png" alt="Robot" className="w-12 h-12 object-contain" />
              <div className="text-lg font-semibold text-center mb-0">Hi, I'm Fin AI Copilot</div>
              <div className="text-md font-semibold text-center">Ask me anything about this conversation</div>
            </div>
          ) : (
            currentThread.map((msg, i) => {
              const isAI = msg.sender === 'ai';
              return (
                <div key={i} className={`flex items-start space-x-3 p-3 rounded-lg shadow-sm border text-sm ${isAI ? darkMode ? 'bg-blue-900 border-blue-500 text-blue-100' : 'bg-[#e0f3ff] border-blue-200 text-blue-900' : darkMode ? 'bg-green-900 border-green-500 text-green-100' : 'bg-[#eaf8ec] border-green-200 text-green-900'}`}>
                  <img src={isAI ? '/AI.png' : agentAvatar} alt={isAI ? 'AI Avatar' : 'Agent Avatar'} className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex flex-col flex-grow">
                    <div>{msg.text}</div>
                    {isAI && (
                      <button onClick={() => handleCopyAIResponse(msg.text)} className="text-xs mt-2 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 w-max transition cursor-pointer">
                        Add to composer
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Recommendation Section */}
<div
  className={`p-4 rounded-lg ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-br from-white to-blue-100 text-gray-800'}`}
>
  <div className="flex items-center gap-2 rounded-lg">
    {selected && (
  <div className="flex items-center gap-2">
    <img src="/AI.png" alt="Recommend Icon" className="w-5 h-5" />
    <span className="text-sm font-semibold">Suggested:</span>
    <button
      onClick={() => {
        const lastUserMsg = [...selected.messages].reverse().find(m => m.sender === 'user')?.text;
        if (lastUserMsg) setDraftMessage(lastUserMsg);
      }}
      className={`ml-2 text-xs px-3 py-1 rounded-lg transition cursor-pointer ${
        darkMode
          ? 'bg-white text-black hover:bg-gray-200'
          : 'bg-white text-black hover:bg-blue-200'
      }`}
    >
      {
        [...selected.messages]
          .reverse()
          .find(m => m.sender === 'user')?.text || 'No prompt available'
      }
    </button>
  </div>
)}

  </div>
</div>


        <div className={`p-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <MessageInput value={draftMessage || ''} onChange={(val) => setDraftMessage(val || '')} onSend={handleAgentAskAI} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
