import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TCTextAreaProps = {
  type?: string;
  name: string;
  size?: "small" | "medium";
  label?: string;
  id?: string;
  fullWidth?: boolean;
  variant?: "standard" | "outlined" | "filled";
  autoFocus?: boolean;
  autoComplete?: string;
  sx?: SxProps;
  row?: number;
  cols?: number;
};
const CInput = ({
  type = "text",
  name,
  size = "small",
  label,
  id,
  fullWidth,
  variant,
  autoComplete,
  autoFocus,
  sx,
  row,
  cols,
}: TCTextAreaProps) => {
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
          id={id}
          size={size}
          fullWidth={fullWidth}
          variant={variant}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          sx={sx}
          rows={row}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default CInput;
