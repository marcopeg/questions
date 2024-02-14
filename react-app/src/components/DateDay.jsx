import React from "react";

const formatDate = (date) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<span>$2</span>");
};

export const DateDay = ({ date }) => {
  return formatDate(date);
};

export default DateDay;
