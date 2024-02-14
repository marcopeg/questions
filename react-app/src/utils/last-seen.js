import moment from "moment";

export const lastSeen = (dateString) => {
  if (!dateString) return "N/A";

  const date = moment(dateString);
  const now = moment();
  const diffMinutes = now.diff(date, "minutes");
  const diffHours = now.diff(date, "hours");
  const diffDays = now.diff(date, "days");
  const diffWeeks = now.diff(date, "weeks");
  const diffMonths = now.diff(date, "months");

  if (diffMinutes <= 20) return "just now";
  if (diffHours <= 2) return "1 hour ago";
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays >= 2 && diffDays <= 5) return `${diffDays} days ago`;
  if (diffDays >= 6 && diffDays <= 13) return "last week";
  if (diffWeeks >= 2 && diffWeeks <= 3) return `${diffWeeks} weeks ago`;
  if (diffWeeks >= 4 && diffMonths === 0) return "last month";
  if (diffMonths >= 1) return date.format("MMMM Do, YYYY");

  return "N/A";
};
