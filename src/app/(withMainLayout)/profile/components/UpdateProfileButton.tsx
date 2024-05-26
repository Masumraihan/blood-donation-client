"use client";
import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";
import { TUser } from "@/types";
import ChangePasswordModal from "./ChangePasswordModal";

const UpdateProfileButton = ({ data }: { data: TUser | undefined }) => {
  const [open, setOpen] = useState(false);
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen((pre) => !pre)} variant='text' sx={{ marginLeft: "1rem" }}>
        Edit
      </Button>
      <Button
        onClick={() => setChangeModalOpen((pre) => !pre)}
        variant='text'
        sx={{ marginLeft: "1rem" }}
      >
        Change Password
      </Button>
      <UpdateProfileModal open={open} setOpen={setOpen} data={data} />
      <ChangePasswordModal open={changeModalOpen} setOpen={setChangeModalOpen} />
    </>
  );
};

export default UpdateProfileButton;
