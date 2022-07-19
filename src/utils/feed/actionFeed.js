import { deleteComment, postBookmark, setLikeInPost } from "../backendActions";

export const likeHandler = (setAction, action, id, likes, auth, isLiked) => {
  setAction({ isHeartClicked: !action?.isHeartClicked });
  setLikeInPost(isLiked, id, likes, action?.isHeartClicked, auth);
};

export const bookmarkHandler = (setAction, action, id, auth) => {
  setAction({ isBookmarkClicked: !action?.isBookmarkClicked });
  postBookmark(id, auth, action.isBookmarkClicked);
};

export const commentHandler = (setAction, action) => {
  setAction({
    isCommentClicked: !action?.isCommentClicked,
    isViewAllComments: false,
    isHeartClicked: action?.isHeartClicked,
  });
};
export const commentSubmitHandler = (
  e,
  postComment,
  id,
  commentID,
  commentText,
  auth,
  setCommentText
) => {
  e.preventDefault();
  postComment(id, commentID, commentText, auth);
  setCommentText("");
};
export const commentDeleteHandler = (id, commentID) => {
  deleteComment(id, commentID);
};
