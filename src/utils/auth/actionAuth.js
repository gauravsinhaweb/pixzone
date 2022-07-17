export const loginHandler = async (
  loginWithGoogle,
  dispatch,
  authActions,
  navigate
) => {
  await loginWithGoogle();
  dispatch(authActions.setIsAuthenticated({ isAuthenticated: true }));
  navigate("/");
};

export const logoutHandler = async (
  logOut,
  dispatch,
  dataActions,
  authActions
) => {
  await logOut();
  dispatch(
    dataActions.setFeed({
      feed: [],
    })
  );
  dispatch(
    dataActions.setUsers({
      users: [],
    })
  );
  localStorage.setItem("pixzone-token", "");
  dispatch(authActions.setIsAuthenticated({ isAuthenticated: false }));
};
