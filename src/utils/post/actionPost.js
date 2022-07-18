import { dataActions } from "../../redux/reducers/dataSlice";
import { db, storage } from "../../services/firebase/firebase";
import firebase from "firebase";

export const uploadImageHandler = async (
  selectedImageRef,
  setImageUploadProgress,
  e,
  dispatch
) => {
  const file = selectedImageRef.current?.files[0];
  const path = `/images/${file.name}`;
  const ref = storage.ref(path);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  const uploadTask = ref.put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      setImageUploadProgress(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
    },
    (error) => {
      console.log(error.message);
    }
  );
  dispatch(
    dataActions.setPhotoURL({
      photoURL: url,
    })
  );
};

export const postHandler = async (
  auth,
  id,
  inputText,
  data,
  setInputText,
  setImageUploadProgress,
  selectedImageRef,
  dispatch
) => {
  const userDataFromLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const postData = {
    displayName: userDataFromLocalStorage?.name || auth.user.displayName,
    id: id,
    username:
      "@" + auth.user.displayName.replace(" ", "").toLowerCase() ||
      userDataFromLocalStorage.username,
    text: inputText,
    image: data.photoURL,
    avatar: auth.user.photoURL,
    likes: 0,
    time: Date.now(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  await db
    .collection(`users/${auth.user?.uid}/posts`)
    .doc(id)
    .set(postData, { merge: true });
  await db.collection(`feed`).doc(id).set(postData, { merge: true });
  setInputText("");
  dispatch(
    dataActions.setPhotoURL({
      photoURL: "",
    })
  );
  setImageUploadProgress(0);
  selectedImageRef.current.value = "";
};
