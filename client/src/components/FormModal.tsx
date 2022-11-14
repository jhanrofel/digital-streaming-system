import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type AppProps = {
  openActorForm: boolean;
  setOpenActorForm: React.Dispatch<React.SetStateAction<boolean>>;
  formName: string;
};

export default function FormModal({ openActorForm,setOpenActorForm }: AppProps) {
  return (
    <div>
      <Modal
        open={openActorForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        </Box>
      </Modal>
    </div>
  );
}