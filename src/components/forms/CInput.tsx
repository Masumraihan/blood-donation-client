import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type THInputProps = {
  type?: string;
  name: string;
  size?: "small" | "medium";
  label?: string;
  fullWidth?: boolean;
  variant?: "standard" | "outlined" | "filled";
  sx?: SxProps;
};
const CInput = ({
  type = "text",
  name,
  size = "small",
  label,
  fullWidth,
  variant,
  sx,
}: THInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          size={size}
          fullWidth={fullWidth}
          variant={variant}
          sx={sx}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default CInput;
