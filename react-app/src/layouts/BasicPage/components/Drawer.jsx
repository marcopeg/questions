import { useBrowser } from "../../../utils";
import { DrawerDesktop } from "./DrawerDesktop";
import { DrawerMobile } from "./DrawerMobile";

export const Drawer = (props) => {
  const { isMobile } = useBrowser();
  return isMobile ? <DrawerMobile {...props} /> : <DrawerDesktop {...props} />;
};
