import {
  SnackbarProvider,
  useSnackbar as useOriginalSnackbar,
  closeSnackbar
} from "notistack";

import CloseIcon from "@mui/icons-material/Close";

const action = (snackbarId) => (
  <CloseIcon
    fontSize="small"
    onClick={() => {
      closeSnackbar(snackbarId);
    }}
  >
    Dismiss
  </CloseIcon>
);

export const withNotistack =
  (Component, options = {}) =>
  (props) => {
    return (
      <SnackbarProvider
        {...{
          autoHideDuration: options.autoHideDuration || 1000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          action: options.action || action,
          ...options
        }}
      >
        <Component {...props} />
      </SnackbarProvider>
    );
  };

export const useSnackbar = (options = {}) => {
  const snack = useOriginalSnackbar();

  return {
    ...snack,
    enqueueShort: (ag1, ag2 = {}) =>
      snack.enqueueSnackbar(ag1, {
        ...ag2
      }),
    enqueueSuccess:
      (ag1, ag2 = {}) =>
      () =>
        snack.enqueueSnackbar(ag1, {
          variant: "success",
          ...ag2
        }),
    enqueueError:
      (ag1, ag2 = {}) =>
      (err) =>
        snack.enqueueSnackbar(ag1 || err.message, {
          autoHideDuration: 10000,
          variant: "error",
          ...ag2
        })
  };
};

export default withNotistack;
