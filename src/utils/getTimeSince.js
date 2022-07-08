export const timeSince = (timestamp) => {
  const newTimestamp = new Date(timestamp?.seconds * 1000);
  const now = new Date();
  const seconds = (now.getTime() - newTimestamp.getTime()) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;
  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return Math.round(minutes) + " minutes ago";
  } else if (hours < 24) {
    return Math.round(hours) + " hours ago";
  } else if (days < 7) {
    return Math.round(days) + " days ago";
  } else if (weeks < 4) {
    return Math.round(weeks) + " weeks ago";
  } else if (months < 12) {
    return Math.round(months) + " months ago";
  } else if (years < 1) {
    return Math.round(years) + " years ago";
  }
};
