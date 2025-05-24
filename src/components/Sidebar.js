// components/Sidebar.js
import { ChatBubbleLeftRightIcon, Cog6ToothIcon, UsersIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="h-screen w-16 bg-gray-900 flex flex-col items-center py-4 space-y-6 text-white">
      <ChatBubbleLeftRightIcon className="w-6 h-6 cursor-pointer" />
      <UsersIcon className="w-6 h-6 cursor-pointer" />
      <Cog6ToothIcon className="w-6 h-6 cursor-pointer" />
    </div>
  );
};

export default Sidebar;
