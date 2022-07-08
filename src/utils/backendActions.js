import { db } from "../services/firebase/firebase";
import firebase from "firebase";

export const postComment = (id, commentID, commentText, auth) => {
  const postData = {
    comment: commentText,
    displayName: auth.user?.displayName,
    email: auth.user?.email,
    displayPicture: auth.user?.photoURL,
    commentID: commentID,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  db.collection("feed")
    .doc(id)
    .collection("comments")
    .doc(commentID)
    .set(postData);
  db.collection(`users/${auth.user?.uid}/posts`)
    .doc(id)
    .collection("comments")
    .doc(commentID)
    .set(postData);
};
export const getComments = (id, setCommentList) => {
  db.collection("feed")
    .doc(id)
    .collection("comments")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) =>
      setCommentList(snapshot.docs.map((doc) => doc.data()))
    );
};
export const setLikeInPost = (action, id, likes) => {
  db.collection("feed")
    .doc(id)
    .set(
      {
        likes: action.isHeartClicked ? likes - 1 : likes + 1,
      },
      { merge: true }
    );
};
export const deleteComment = (id, commentID) => {
  db.collection("feed").doc(id).collection("comments").doc(commentID).delete();
};

export const submitEditUser = async (
  e,
  data,
  nameRef,
  usernameRef,
  bioRef,
  linkRef,
  setIsOpen
) => {
  e.preventDefault();
  await db
    .collection("users")
    .doc(data.userID)
    .set(
      {
        name: nameRef.current?.value,
        username: "@" + usernameRef.current?.value,
        bio: bioRef.current?.value,
        link: linkRef.current?.value,
      },
      { merge: true }
    );
  localStorage.setItem(
    "userData",
    JSON.stringify({
      name: nameRef.current?.value,
      username: "@" + usernameRef.current?.value,
      bio: bioRef.current?.value,
      link: linkRef.current?.value,
    })
  );
  setIsOpen(false);
};
