"use client";
import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";
import { TUser } from "@/types";

const UpdateProfileButton = ({ data }: { data: TUser | undefined }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen((pre) => !pre)} variant='text' sx={{ marginLeft: "1rem" }}>
        Edit
      </Button>
      <UpdateProfileModal open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default UpdateProfileButton;
