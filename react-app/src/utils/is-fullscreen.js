export const IOS_SPACING_BOTTOM = "30px";

export const isFullScreen = () => {
  try {
    return Boolean(window.navigator.standalone);
  } catch {
    return false;
  }
};

export default isFullScreen;
