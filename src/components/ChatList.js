// src/components/ChatList.js
const ChatList = ({ conversations, onSelect }) => {
  return (
    <div className="w-1/4 h-full border-r overflow-y-auto">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv)}
          className="p-4 border-b hover:bg-gray-100 cursor-pointer"
        >
          <h4 className="font-semibold">{conv.user}</h4>
          <p className="text-sm text-gray-600">{conv.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
