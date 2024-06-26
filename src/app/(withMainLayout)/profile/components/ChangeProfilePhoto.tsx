"use client";
import placeholder from "@/assets/user_placeholder.png";
import { useUpdateProfileMutation } from "@/redux/featues/user/userApi";
import revalidateData from "@/services/actions/revalidateData";
import { TImageBBResponse } from "@/types";
import uploadIntoImageBB from "@/utils/uploadImageIntoImageBB";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
const ChangeProfilePhoto = ({ photo }: { photo: string | null | undefined }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const router = useRouter();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    const formData = new FormData();
    formData.append("image", file as Blob);
    const res: TImageBBResponse = await uploadIntoImageBB(formData);
    if (res.data.url) {
      try {
        const profileImageResponse = await updateProfile({
          photo: res.data.url,
        }).unwrap();

        if (profileImageResponse?.success) {
          toast.success("Profile image changed successfully");
          revalidateData("profile")
        }
      } catch (error) {
        console.log(error);
        toast.error("Profile image changed failed");
      }
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <Box className='profile-image' component='label'>
        {photo ? (
          <Image
            alt={"profile"}
            src={photo}
            width={150}
            height={150}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <Image
            alt={"profile"}
            src={placeholder}
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
          />
        )}
        <AddAPhotoIcon
          sx={{
            position: "absolute",
            bottom: 10,
            right: 30,
            zIndex: 20,
            color: "darkgray",
          }}
        />
        <VisuallyHiddenInput
          type='file'
          onChange={handleChange}
          accept='image/png, image/jpeg image/webp image/svg image/jpg'
        />
      </Box>
    </>
  );
};

export default ChangeProfilePhoto;
