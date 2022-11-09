import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {IAlert} from "../utilities/types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AppProps = {
  alertData: IAlert;
  onClickCloseAlert: (event: Event | React.SyntheticEvent<any, Event>) => void;
};

export default function SnackAlert({
  alertData,
  onClickCloseAlert,
}: AppProps) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClickCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertData.open}
        autoHideDuration={5000}
        onClose={onClickCloseAlert}
        action={action}
      >
        <Alert
          onClose={onClickCloseAlert}
          severity={alertData.severity}
          sx={{ width: "100%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
