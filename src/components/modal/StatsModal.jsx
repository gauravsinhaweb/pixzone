import React from "react";
import { useSelector } from "react-redux";

export const StatsModal = ({ isFollowersClicked }) => {
  const { data } = useSelector((state) => state);
  return (
    <div className="px-6">
      {isFollowersClicked ? (
        <>
          <h1 className="text-center font-medium text-xl">Followers</h1>
          {data.followers &&
            data.followers.map(({ name, id, username, photoURL }) => (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-6 my-6 break-words"
              >
                <div className="h-14 w-14 overflow-hidden cursor-pointer">
                  <img src={photoURL} alt="" className="rounded-full w-full" />
                </div>
                <div className="flex-1">
                  <div className="font-bold capitalize">{name}</div>
                  <div className="text-sm text-gray-600">@loremipsum</div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <>
          <h1 className="text-center font-medium text-xl">Following</h1>
          {data.following &&
            data.following.map(({ name, id, username, photoURL }) => (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-6 my-6 break-words"
              >
                <div className="h-14 w-14 overflow-hidden cursor-pointer">
                  <img src={photoURL} alt="" className="rounded-full w-full" />
                </div>
                <div className="flex-1">
                  <div className="font-bold capitalize">{name}</div>
                  <div className="text-sm text-gray-600">@loremipsum</div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
