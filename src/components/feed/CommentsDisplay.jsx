import React from "react";
import { FaTrash } from "react-icons/fa";
import { commentDeleteHandler, timeSince } from "../../utils";

export const CommentsDisplay = ({
  commentData: { comment, commentID, timestamp, displayName, displayPicture },
  data,
  id,
}) => {
  return (
    <div className="flex justify-between border-b border-gray-400 border-opacity-20 items-start text-xs mt-4 mb-2 gap-6">
      <div className="bg-gray-300 h-6 w-6  rounded-full overflow-hidden">
        <img src={displayPicture} alt={displayName} />
      </div>
      <div
        className={`flex-1 ${data?.theme ? "text-gray-900" : "text-gray-100"}`}
      >
        <div className=" flex gap-2 items-baseline">
          <span className="font-medium  capitalize">{displayName}</span>
          <span className="font-medium text-gray-600 capitalize">
            {timeSince(timestamp)}
          </span>
        </div>
        <div className="my-2">{comment}</div>
      </div>
      <button
        onClick={() => commentDeleteHandler(id, commentID)}
        className="text-xs text-red-600 opacity-80"
      >
        <FaTrash />
      </button>
    </div>
  );
};
