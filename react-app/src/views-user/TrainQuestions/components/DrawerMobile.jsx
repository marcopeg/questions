import { Drawer } from "@mui/material";

import BasicPage from "../../../layouts/BasicPage";

export const DrawerMobile = ({
  children,
  title,
  subtitle,
  handleClose,
  ...props
}) => (
  <Drawer
    {...props}
    onClose={handleClose}
    anchor={"right"}
    variant="temporary"
    sx={{
      width: "100vw",
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: "100vw",
        boxSizing: "border-box"
      }
    }}
  >
    <BasicPage
      standalone
      title={title}
      subtitle={subtitle}
      backTo={() => handleClose()}
    >
      {children}
    </BasicPage>
  </Drawer>
);
