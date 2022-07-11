import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const WidgetCard = () => {
  const { data, auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const userProfile = (id) => {
    navigate(`/${id}`);
  };
  const filteredUsers = data.users?.filter(
    (user) => user.id !== auth.user?.uid
  );
  return (
    <>
      <div className="text-xl font-black">You might like</div>
      {filteredUsers &&
        filteredUsers.map(({ name, id, username, photoURL }, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-6 my-6 break-words"
          >
            <div
              onClick={() => userProfile(id)}
              className="h-10 w-10  overflow-hidden cursor-pointer"
            >
              <img src={photoURL} alt={name} className="rounded-full w-full" />
            </div>
            <div className="flex-1">
              <div className="font-bold capitalize">{name}</div>
              <div className="text-sm text-gray-600">{username}</div>
            </div>
            <button
              className={`px-2 py-1 text-sm font-bold rounded-full ${
                data.theme ? "bg-gray-600 text-white" : "bg-white text-black"
              }`}
            >
              Follow
            </button>
          </div>
        ))}
    </>
  );
};
