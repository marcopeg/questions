import { LottieAnimation } from "./LottieAnimation";
import animationData from "./animations/success.json";

export const SuccessAnimation = (props) => (
  <LottieAnimation {...props} data={animationData} />
);
