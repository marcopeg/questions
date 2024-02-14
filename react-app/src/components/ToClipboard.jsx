import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useClipboard } from "../utils/use-clipboard";

export const ToClipboard = ({ text, confirmMsg, size, ...props }) => {
  const { toClipboard } = useClipboard(confirmMsg);

  const handleClick = () => toClipboard(text);

  return (
    <IconButton {...props} onClick={handleClick} size={size}>
      <ContentCopyIcon fontSize={size} />
    </IconButton>
  );
};
