export const loginHandler = async (loginWithGoogle, dispatch, authActions) => {
  await loginWithGoogle();
  dispatch(authActions.setIsAuthenticated({ isAuthenticated: true }));
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
  dispatch(authActions.setIsAuthenticated({ isAuthenticated: false }));
};
