import Lottie from "react-lottie";

export const LottieAnimation = ({
  data,
  onComplete = () => {},
  width = "80ww",
  height = "auto",
  autoplay = true,
  loop = false,
  rendererSettings = {
    preserveAspectRatio: "xMidYMid slice"
  },
  options = {},
  eventListeners = [],
  ...props
}) => (
  <Lottie
    {...props}
    width={width}
    height={height}
    options={{
      ...options,
      loop,
      autoplay,
      animationData: data,
      rendererSettings
    }}
    eventListeners={[
      ...eventListeners,
      {
        eventName: "complete",
        callback: onComplete
      }
    ]}
  />
);
