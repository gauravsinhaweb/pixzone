import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "../../assets/icons";
import {
  bookmarkHandler,
  commentHandler,
  commentSubmitHandler,
  getComments,
  likeHandler,
  postComment,
  timeSince,
} from "../../utils";
import { CommentsDisplay } from "../index";

export const FeedCard = ({
  post: {
    displayName,
    username,
    uid,
    id,
    likes,
    text,
    image,
    avatar,
    timestamp,
    isBookmarked,
    isLiked,
  },
}) => {
  const { data, auth } = useSelector((state) => state);
  const [action, setAction] = useState({
    isHeartClicked: false,
    isBookmarkClicked: false,
    isCommentClicked: false,
    isViewAllComments: false,
  });
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState([]);
  const date = timestamp?.toDate();
  const commentID = uuid();
  const navigate = useNavigate();
  const userProfile = (id) => {
    navigate(`/${id}`);
  };
  useEffect(() => {
    getComments(id, setCommentList);
  }, [id]);
  return (
    <>
      <div className="flex justify-between gap-6">
        <div
          onClick={() => userProfile(uid)}
          className="bg-gray-300 h-10 w-10  rounded-full overflow-hidden"
        >
          <img src={avatar} alt={displayName} />
        </div>
        <div className="flex-1">
          <div className=" flex gap-2 items-baseline">
            <span className="font-medium capitalize">{displayName}</span>
            <span className="text-gray-500">
              {username ? username : "@loremipsum"}
            </span>
            <span className="text-gray-500">•</span>
            <span title={"posted on " + date} className="text-gray-500 text-sm">
              {timeSince(timestamp)}
            </span>
          </div>
          <div
            className={`my-2 text-sm ${
              data.theme ? "text-gray-900" : "text-white"
            }`}
          >
            {text}
          </div>
          {image && (
            <div className="overflow-hidden	py-4 ">
              <img
                src={image}
                alt={text}
                className="rounded-lg object-contain"
              />
            </div>
          )}
          <div className="flex justify-between gap-2 pt-2 text-gray-600">
            <div className="flex gap-8">
              <div
                className={`flex items-center gap-4 ${
                  isLiked ? "text-pink-600" : ""
                }`}
              >
                <button
                  onClick={() =>
                    likeHandler(setAction, action, id, likes, auth, isLiked)
                  }
                >
                  {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                </button>
                <span className="text-sm">{likes}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => commentHandler(setAction, action)}
                  className={action?.isCommentClicked ? "text-sky-600" : ""}
                >
                  <FaRegComment size={18} />
                </button>
                <span className="text-sm">{commentList?.length}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => bookmarkHandler(setAction, action, id, auth)}
                className={isBookmarked ? "text-green-600" : ""}
              >
                {isBookmarked ? (
                  <FaBookmark size={18} />
                ) : (
                  <FaRegBookmark size={18} />
                )}
              </button>
            </div>
          </div>
          {action?.isCommentClicked && (
            <div>
              {commentList?.length > 0 && (
                <button
                  onClick={() =>
                    setAction({
                      isViewAllComments: !action.isViewAllComments,
                      isCommentClicked: true,
                      isHeartClicked: action.isHeartClicked,
                    })
                  }
                  className={`${
                    data.theme ? " text-gray-900 " : "text-gray-400"
                  } text-xs mt-6 cursor-pointer`}
                >
                  View all {commentList?.length} comments
                </button>
              )}

              <hr className="my-2 opacity-20" />
              {commentList &&
                action.isViewAllComments &&
                commentList.map((commentData) => (
                  <CommentsDisplay
                    key={commentData.commentID}
                    commentData={commentData}
                    data={data}
                    id={id}
                  />
                ))}
              <form
                onSubmit={(e) =>
                  commentSubmitHandler(
                    e,
                    postComment,
                    id,
                    commentID,
                    commentText,
                    auth,
                    setCommentText
                  )
                }
              >
                <input
                  id="comment-box"
                  type={text}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  value={commentText}
                  autoComplete="off"
                  className="w-full text-sm bg-transparent py-2 border-none focus:outline-none"
                />
                <label htmlFor="comment-box"></label>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
