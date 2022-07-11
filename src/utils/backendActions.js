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
  setIsOpen,
  isOpen
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
  setIsOpen({ ...isOpen, editModal: false });
};

export const getFollowers = (user, dispatch, dataAction) => {
  db.collection("users")
    .doc(user?.id)
    .collection("followers")
    .onSnapshot((snapshot) =>
      dispatch(
        dataAction.setFollowers({
          followers: snapshot.docs.map((doc) => doc.data()),
        })
      )
    );
};

export const getFollowing = (user, dispatch, dataAction) => {
  db.collection("users")
    .doc(user?.id)
    .collection("following")
    .onSnapshot((snapshot) =>
      dispatch(
        dataAction.setFollowing({
          following: snapshot.docs.map((doc) => doc.data()),
        })
      )
    );
};

export const followHandler = (id, auth, user, setAction, action) => {
  db.collection("users")
    .doc(id)
    .collection("followers")
    .doc(auth.user.uid)
    .set({
      id: auth.user.uid,
      name: auth.user.displayName,
      photoURL: auth.user.photoURL,
      email: auth.user.email,
    });
  db.collection("users")
    .doc(auth.user.uid)
    .collection("following")
    .doc(id)
    .set({
      id: id,
      name: user?.name,
      photoURL: user?.photoURL,
      email: user?.email,
    });
  setAction({ ...action, isFollow: !action.isFollow });
};
