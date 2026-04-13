import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

import { ErrorBannerProps } from "../types/types.js";
import { UI_TEXT } from "../constants/uiText.js";

const ErrorBanner = ({ error, clearError }: ErrorBannerProps) => {
  if (!error) return null;

  return (
    <Snackbar
      open={!!error}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={clearError}
    >
      <Alert severity="error" onClose={clearError}>
        <AlertTitle>{UI_TEXT.ERROR_BANNER.TITLE}</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorBanner;