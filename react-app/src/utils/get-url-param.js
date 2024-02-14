export const getURLParam = (paramName) => {
  const url = new URL(window.location.href);
  const paramValue = url.searchParams.get(paramName);
  url.searchParams.delete(paramName);
  window.history.replaceState({}, "", url.toString());
  return paramValue;
};
