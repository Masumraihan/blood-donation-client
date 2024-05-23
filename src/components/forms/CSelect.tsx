import { MenuItem, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TCSelectProps = {
  type?: string;
  name: string;
  size?: "small" | "medium";
  items: string[];
  label?: string;
  fullWidth?: boolean;
  variant?: "standard" | "outlined" | "filled";
  sx?: SxProps;
};
const CSelect = ({
  type = "text",
  name,
  size = "small",
  items,
  label,
  fullWidth,
  variant,
  sx,
}: TCSelectProps) => {
  const { control, formState } = useFormContext();
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
          select
          sx={sx}
          error={!!error?.message}
          helperText={error?.message}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default CSelect;
