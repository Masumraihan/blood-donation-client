import placeholder from "@/assets/user_placeholder.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box } from "@mui/material";
import Image from "next/image";
const ChangeProfilePhoto = ({ photo }: { photo: string | null | undefined }) => {
  return (
    <>
      <Box className='profile-image'>
        {photo ? (
          <Image
            alt={"profile"}
            src={photo}
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
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
      </Box>
    </>
  );
};

export default ChangeProfilePhoto;
