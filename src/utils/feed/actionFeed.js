import { deleteComment } from "../backendActions";

export const likeHandler = (setAction, setLikeInPost, action, id, likes) => {
  setAction({ isHeartClicked: !action?.isHeartClicked });
  setLikeInPost(action, id, likes);
};

export const bookmarkHandler = () => {};

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
