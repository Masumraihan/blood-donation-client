"use client";
import { Button } from "@mui/material";
import UpdateProfileModal from "./UpdateProfileModal";
import { useState } from "react";
import { TMyProfile } from "@/types";

const UpdateProfileButton = ({ data }: { data: TMyProfile | undefined }) => {
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
