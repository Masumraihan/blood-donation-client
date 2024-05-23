"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { boolean } from "zod";
type TCDatePickerProps = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  defaultValue?: dayjs.Dayjs;
  variant?: "standard" | "outlined" | "filled";
  required?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
};
const CDatePicker = ({
  name,
  size = "small",
  label,
  fullWidth,
  sx,
  defaultValue,
  required = false,
  variant = "outlined",
  disablePast,
  disableFuture,
}: TCDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(defaultValue || new Date().toDateString())}
      render={({ field: { onChange, value, ...filed }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            timezone='system'
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={(date) => onChange(date)}
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

export default CDatePicker;
