import { useState } from "react";
import Box from "@mui/material/Box";
import NewPromo from "./NewPromo";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import usePromoStore from "../.././store/PromoDataContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PromoModal = ({ open, handleClose }) => {
  const { initPromo, promo } = usePromoStore();
  return (
    <>
      {promo && (
        <Modal
          open={open}
          onClose={() => {
            handleClose();
            /*  initPromo(); */ // Suppongo che tu abbia la funzione initEvent()
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <NewPromo promo={promo} handleClose={handleClose} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PromoModal;
