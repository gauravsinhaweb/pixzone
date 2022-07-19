export const filterBookmark = (feed, showBookmark) => {
  if (showBookmark) {
    return feed?.filter((post) => post.isBookmarked === true);
  }
  return feed;
};
export const filterPopular = (feed, showPopular) => {
  if (showPopular) {
    return feed.slice().sort((a, b) => b?.likes - a?.likes);
  }
  return feed;
};
export const filterRecent = (feed, showRecent) => {
  if (showRecent) {
    return feed.slice().sort((a, b) => b?.timestamp - a?.timestamp);
  }
  return feed;
};
export const filterTrending = (feed, showTrending) => {
  if (showTrending) {
    return feed
      .slice()
      .sort((a, b) => b?.likes - a?.likes && b?.timestamp - a?.timestamp);
  }
  return feed;
};
export const filterExplore = (feed, showExplore) => {
  if (showExplore) {
    return feed.slice().sort((a, b) => b?.likes - a?.likes);
  }
  return feed;
};
