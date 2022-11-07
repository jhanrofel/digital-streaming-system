import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

type AppProps = {
  open: boolean;
  setOpen: any;
  onConfirmDelete:any;
};

const DeleteDialog = ({ open, setOpen,onConfirmDelete }: AppProps) => {
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Confirm Box</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>DISAGREE</Button>
          <Button onClick={onConfirmDelete}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
