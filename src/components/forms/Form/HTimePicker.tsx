"use client";
import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
type THTimePickerProps = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  defaultValue?: dayjs.Dayjs;
  variant?: "standard" | "outlined" | "filled";
  required?: boolean;
};
const HTimePicker = ({
  name,
  size = "small",
  label,
  fullWidth,
  sx,
  defaultValue,
  required = false,
  variant = "outlined",
}: THTimePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(defaultValue || new Date().toDateString())}
      render={({ field: { onChange, value, ...filed }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={label}
            timezone='system'
            disablePast
            onChange={(time) => onChange(time)}
            value={value || Date.now()}
            {...filed}
            slotProps={{
              textField: {
                size,
                fullWidth,
                variant,
                required,
                sx,
                helperText: error?.message,
                error: !!error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default HTimePicker;
