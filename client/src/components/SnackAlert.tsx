import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AppProps = {
  alertData: AlertData;
  setAlertData:(value: AlertData) => void;
};

interface AlertData {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

export default function SimpleSnackbar({ alertData,setAlertData }: AppProps) {
  const handleClose = () => {
    setAlertData({open:false,message:"",severity:"info"});
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={alertData.open}
        autoHideDuration={5000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={alertData.severity} sx={{ width: "100%" }}>
          {alertData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
