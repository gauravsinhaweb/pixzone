import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/reducers/authSlice";
import { auth, db, firebase } from "../services/firebase/firebase";

function useAuth() {
  const dispatch = useDispatch();

  function signInWithGoogle() {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  function logOut() {
    return firebase.auth().signOut();
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          authActions.setUser({ user: { photoURL, uid, email, displayName } })
        );
        dispatch(authActions.setIsAuthenticated({ isAuthenticated: true }));
        db.collection("users")
          .doc(user.uid)
          .set(
            {
              id: user.uid,
              name: user.displayName,
              username: "@" + user.displayName.replace(" ", "").toLowerCase(),
              email: user.email,
              photoURL: user.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      }
    });
  }, [dispatch]);

  return [signInWithGoogle, logOut];
}

export default useAuth;
