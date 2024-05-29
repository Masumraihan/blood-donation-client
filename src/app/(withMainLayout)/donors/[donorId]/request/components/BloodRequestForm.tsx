"use client";
import CDatePicker from "@/components/forms/CDatePicker";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import createBloodRequest from "@/services/actions/createBloodRequest";
import { TUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const bloodRequestSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number can't be longer than 15 digits" }),
  dateOfDonation: z.date(),
  hospitalName: z.string().min(1, { message: "Hospital name is required" }),
  hospitalAddress: z.string().min(1, { message: "Hospital address is required" }),
  reason: z
    .string()
    .min(1, { message: "Reason is required" })
    .max(500, { message: "Reason can't be longer than 500 characters" }),
});
const BloodRequestForm = ({ user }: { user: TUser | undefined }) => {
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const data = {
      ...values,
      donorId: user?.id,
    };

    const res = await createBloodRequest(data);

    console.log(res);
  };

  const defaultValues = {
    phoneNumber: user?.phoneNumber || "",
    dateOfDonation: new Date(),
    hospitalName: "",
    hospitalAddress: "",
    reason: "",
  };
  return (
    <CForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resolver={zodResolver(bloodRequestSchema)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <CInput name='phoneNumber' label='Phone Number' variant='outlined' fullWidth />
        <CDatePicker name='date' label='Date' fullWidth disablePast />
        <CInput name='hospitalName' label='Hospital Name' variant='outlined' fullWidth />
        <CInput name='hospitalAddress' label='Hospital Address' variant='outlined' fullWidth />
        <CInput name='reason' label='Reason' variant='outlined' fullWidth />
        <Button
          type='submit'
          sx={{
            marginTop: 2,
            padding: 1.5,
          }}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </CForm>
  );
};

export default BloodRequestForm;
