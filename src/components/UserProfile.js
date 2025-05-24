// components/UserProfile.js
const UserProfile = ({ user }) => {
  return (
    <div className="w-1/4 h-full p-4 border-l bg-white">
      <h2 className="font-semibold mb-4">User Info</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Tags:</strong> {user.tags.join(', ')}</p>
    </div>
  );
};

export default UserProfile;
