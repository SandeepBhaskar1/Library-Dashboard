import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "Are you sure?"}</DialogTitle>
      <DialogContent>
        <Typography>
          This action cannot be undone. Do you want to continue?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
