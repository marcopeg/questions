import { Box, Divider } from "@mui/material";
import useBrowser from "../../utils/use-browser";

export const BasicPageSection = ({ withBorder, sx = {}, ...props }) => {
  const { isMobile, isDesktop } = useBrowser();
  return (
    <>
      <Box
        {...props}
        sx={{
          mt: isMobile ? 2 : 2,
          mb: isMobile ? 0 : 0,
          ml: isDesktop ? 3 : 2,
          mr: isDesktop ? 3 : 2,
          ...sx
        }}
      />
      {Boolean(withBorder) && (
        <Divider
          sx={{ mt: 2, ml: isDesktop ? -3 : null, mr: isDesktop ? -3 : null }}
        />
      )}
    </>
  );
};
