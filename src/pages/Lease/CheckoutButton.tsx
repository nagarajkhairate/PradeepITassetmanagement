import React, { useState } from "react";
import { Button } from "@mui/joy";
import CheckOutModal from "./CheckOutModal";

const CheckoutButton: React.FC= () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} color="primary" variant="contained">
        Checkout
      </Button>
      <CheckOutModal open={open} onClose={handleClose} />
    </>
  );
};

export default CheckoutButton;
