// components/Topbar.js
const Topbar = () => {
  return (
    <div className="h-16 px-6 flex items-center justify-between bg-white border-b">
      <input
        type="text"
        placeholder="Search..."
        className="border px-4 py-2 rounded-md w-1/3"
      />
      <div className="flex items-center space-x-3">
        <span>Agent John</span>
        <img
  src="https://i.pravatar.cc/40"
  alt="avatar"
  className="h-8 w-8 rounded-full"
/>
      </div>
    </div>
  );
};

export default Topbar;
