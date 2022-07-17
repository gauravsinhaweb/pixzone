import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../redux/reducers/dataSlice";
import {
  followHandler,
  unFollowHandler,
  getFollowers,
  getFollowing,
} from "../../utils";
import { EditProfileModal, StatsModal } from "../index";
export const ProfileCard = () => {
  const { data, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = data.users?.find((user) => user?.id === data?.userID);
  const [isModalOpen, setIsModalOpen] = useState({
    editModal: false,
    statsModal: false,
  });
  const [action, setAction] = useState({
    isFollowersClicked: false,
    isFollow: false,
  });
  const isCurrentUser = user?.id === auth.user?.uid;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: data.theme ? "white" : " black",
      color: data.theme ? "black" : " white",
      borderColor: "#374151",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(2px)",
    },
  };

  const openEditModal = () => {
    setIsModalOpen({ ...isModalOpen, editModal: true });
  };
  const closeEditModal = () => {
    setIsModalOpen({ ...isModalOpen, editModal: false });
  };
  const openStatsModal = (value) => {
    setIsModalOpen({
      ...isModalOpen,
      statsModal: true,
    });
    setAction({ ...action, isFollowersClicked: value });
  };
  const closeStatsModal = () => {
    setIsModalOpen({ ...isModalOpen, statsModal: false });
  };

  useEffect(() => {
    getFollowers(user, dispatch, dataActions);
    getFollowing(user, dispatch, dataActions);
  }, [user, dispatch]);
  return (
    <div
      className={`relative h-full w-full  ${
        data.theme ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="relative h-40 w-full bg-gradient-to-b from-gray-700 to-gray-900">
        <div className="absolute p-4 top-20 flex h-full w-full justify-between items-center">
          <div
            className={`h-32 w-32 p-1 ${
              data.theme ? "bg-white" : "bg-black"
            } rounded-full overflow-hidden`}
          >
            <img
              src={user?.photoURL}
              alt={user?.name}
              className="rounded-full w-full"
            />
          </div>
          {isCurrentUser ? (
            <button
              onClick={openEditModal}
              className="mt-16 text-sm border p-2 px-4 font-bold rounded-3xl border-gray-400"
            >
              Edit profile
            </button>
          ) : data.followers?.length === 0 ? (
            <button
              onClick={() =>
                followHandler(user?.id, auth, user, setAction, action)
              }
              className={`mt-16 text-sm border  p-2 px-5 font-bold rounded-3xl border-gray-400 ${
                data.theme ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              Follow
            </button>
          ) : (
            <button
              onClick={() =>
                unFollowHandler(user?.id, auth, user, setAction, action)
              }
              className={`mt-16 text-sm border  p-2 px-5 text-red-400 bg-transparent border-red-400 font-bold rounded-3xl border-gray-400 ${
                data.theme ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              Unfollow
            </button>
          )}
        </div>
        <Modal
          isOpen={isModalOpen.editModal}
          style={customStyles}
          onRequestClose={closeEditModal}
          contentLabel="editModal"
          ariaHideApp={false}
        >
          <EditProfileModal
            setIsOpen={setIsModalOpen}
            isOpen={isModalOpen.editModal}
          />
          {/* <StatsModal /> */}
        </Modal>
      </div>
      <div className="mt-20  p-4">
        <div className="font-black text-xl capitalize">{user?.name}</div>
        <div className="text-gray-500 font-normal	">{user?.username}</div>
        {user?.bio && <p className="text-sm my-2 font-normal">{user?.bio}</p>}
        {user?.link && (
          <p>
            <span>🔗</span>

            <a
              href={user?.link}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-400 font-light cursor-pointer hover:underline"
            >
              {user?.link}
            </a>
          </p>
        )}
        <div className="flex text-sm mt-2 gap-6">
          <div
            onClick={() => openStatsModal(false)}
            className="flex gap-2 cursor-pointer capitalize"
          >
            <span className="font-black">{data.following?.length}</span>
            <span className="text-gray-500">following</span>
          </div>
          <Modal
            isOpen={isModalOpen.statsModal}
            style={customStyles}
            onRequestClose={closeStatsModal}
            contentLabel="statsModal"
            ariaHideApp={false}
          >
            <StatsModal isFollowersClicked={action.isFollowersClicked} />
          </Modal>
          <div
            onClick={() => openStatsModal(true)}
            className="flex gap-2 cursor-pointer capitalize"
          >
            <span className="font-black">{data.followers?.length}</span>
            <span className="text-gray-500">followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
