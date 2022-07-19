import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  posts: [],
  feed: [],
  photoURL: "",
  theme: JSON.parse(localStorage.getItem("theme")) || false,
  isBookmarked: false,
  isCommentActive: false,
  imageUploadProgress: 0,
  userID: "",
  showModal: false,
  followers: [],
  following: [],
  showBookmark: false,
  showPopular: false,
  showRecent: false,
  showTrending: false,
  explore: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFeed: (state, action) => {
      state.feed = action.payload.feed;
    },
    setPhotoURL: (state, action) => {
      state.photoURL = action.payload.photoURL;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    setImageUploadProgress: (state, action) => {
      state.imageUploadProgress = action.payload.imageUploadProgress;
    },
    setUserID: (state, action) => {
      state.userID = action.payload.userID;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload.showModal;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    setFollowing: (state, action) => {
      state.following = action.payload.following;
    },
    setShowBookmark: (state, action) => {
      state.showBookmark = action.payload.showBookmark;
    },
    setShowPopular: (state, action) => {
      state.showPopular = action.payload.showPopular;
    },
    setShowRecent: (state, action) => {
      state.showRecent = action.payload.showRecent;
    },
    setShowTrending: (state, action) => {
      state.showTrending = action.payload.showTrending;
    },
    setExplore: (state, action) => {
      state.explore = action.payload.explore;
    },
  },
});

export default dataSlice.reducer;
export const dataActions = dataSlice.actions;
