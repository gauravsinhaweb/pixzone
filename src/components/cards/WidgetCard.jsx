import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../utils";

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
        filteredUsers
          .slice(-10, -4)
          .map(({ name, id, username, timestamp, photoURL }, index) => (
            <div
              key={index}
              className="flex flex-wrap items-start justify-between gap-6 my-6 break-words"
            >
              <div
                onClick={() => userProfile(id)}
                className="h-10 w-10  overflow-hidden cursor-pointer"
              >
                <img
                  src={photoURL}
                  alt={name}
                  className="rounded-full w-full"
                />{" "}
              </div>
              <div className="flex-1">
                <div className="font-bold capitalize"> {name}</div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span> {username}</span>
                  <span className="text-xs w-14">
                    Joined {timeSince(timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};
