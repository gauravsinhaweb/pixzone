import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/reducers/authSlice";
import { dataActions } from "../redux/reducers/dataSlice";
import { auth, db, firebase } from "../services/firebase/firebase";

function useAuth() {
  const { data } = useSelector((state) => state);
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
        const userData = {
          id: user.uid,
          name: user.displayName,
          username: "@" + user.displayName.replace(" ", "").toLowerCase(),
          email: user.email,
          photoURL: user.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const userDataFromLocalStorage = JSON.parse(
          localStorage.getItem("userData")
        );
        db.collection("users")
          .doc(user.uid)
          .set(userDataFromLocalStorage ? userDataFromLocalStorage : userData, {
            merge: true,
          });

        db.collection(`users`)
          .doc(`${user?.uid}`)
          .get()
          .then((doc) => {
            try {
              if (doc) {
                if (data.userID) {
                  db.collection(`users/${data.userID}/posts`)
                    .orderBy("timestamp", "desc")
                    .onSnapshot((snapshot) => {
                      dispatch(
                        dataActions.setFeed({
                          feed: snapshot.docs.map((doc) => doc.data()),
                        })
                      );
                    });
                } else if (!data.userID) {
                  db.collection(`feed`)
                    .orderBy("timestamp", "desc")
                    .onSnapshot((snapshot) =>
                      dispatch(
                        dataActions.setFeed({
                          feed: snapshot.docs.map((doc) => doc.data()),
                        })
                      )
                    );
                }
              } else return;
            } catch (e) {
              console.log(e);
            }
          });
        db.collection("users").onSnapshot((snapshot) => {
          dispatch(
            dataActions.setUsers({
              users: snapshot.docs.map((doc) => doc.data()),
            })
          );
        });
      }
    });
  }, [dispatch, data.userID]);

  return [signInWithGoogle, logOut];
}

export default useAuth;
