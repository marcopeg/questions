import { useSnackbar } from "notistack";
import clipboard from "./clipboard";

export const useClipboard = (_options = {}) => {
  const { enqueueSnackbar } = useSnackbar();

  return {
    toClipboard: (text, options = {}) => {
      clipboard(text);
      enqueueSnackbar(
        typeof options === "string"
          ? options
          : options.confirmMsg || typeof _options === "string"
          ? _options
          : _options.confirmMsg || "Text copied",
        {
          autoHideDuration: 2000
        }
      );
    }
  };
};
