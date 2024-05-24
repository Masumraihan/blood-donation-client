import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";

type THFileUploaderProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

const HFileUploader = ({ name, label, sx }: THFileUploaderProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        return (
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            sx={sx}
            startIcon={<CloudUploadIcon />}
          >
            {label || "Upload file"}
            <Input
              {...field}
              name={name}
              onChange={(e) => onChange((e.target as HTMLInputElement).files?.[0])}
              type='file'
              value={value?.fileName}
              error={!!error?.message}
              sx={{
                display: "none",
              }}
            />
          </Button>
        );
      }}
    />
  );
};

export default HFileUploader;
