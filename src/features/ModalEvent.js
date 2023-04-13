import React, { useState } from "react";
import Box from "@mui/material/Box";
import NewEvent from "./NewEvent";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEvent = ({ event, open, handleClose }) => {
  console.log(event, open, handleClose);
  return (
    <>
      {event && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <NewEvent event={event} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalEvent;
