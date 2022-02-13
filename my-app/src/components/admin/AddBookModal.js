import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddBookForm from "./forms/AddBookForm";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddBookModal({ addBooks }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container>
        <Grid item>
          <Button onClick={handleOpen} variant="contained" color="primary">
            <AddIcon />
            Add Book
          </Button>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 800 }}>
            <AddBookForm addBooks={addBooks} closeModal={closeModal} />
          </Box>
        </Modal>
      </Grid>
    </div>
  );
}
