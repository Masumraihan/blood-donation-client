"use client";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { SxProps, styled } from "@mui/material/styles";
import * as React from "react";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type TCModalProps = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sx?: SxProps;
};

const CModal = ({ children, title, open, setOpen, sx }: TCModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={sx}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          {title}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
          {children}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};
export default CModal;
