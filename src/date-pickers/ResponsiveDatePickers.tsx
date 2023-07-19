import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { parseISO } from "date-fns";
import * as React from "react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { date, InferType, object } from "yup";

const schema = object({
  openDate: date().optional(),
  closeDate: date().optional(),
  latestAmendmentVersionDate: date().optional(),
  irbApprovalDate: date().optional(),
});

export default function ResponsiveDatePickers() {
  const [formData, setFormData] = useState("");
  const { control, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  React.useEffect(() => {
    reset({
      openDate: parseISO("2023-01-22"),
      closeDate: undefined,
    });
    setFormData(JSON.stringify(getValues()));
  }, []);

  const submitData: SubmitHandler<InferType<typeof schema>> = (data) => {
    console.log(
      `Form Data:  \n OpenDate:${data.openDate} \n Close Date:${data.closeDate}`,
    );
    setFormData(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(submitData)} noValidate>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Typography variant="h4"> Date Test:</Typography> <br />
        <Controller
          name="openDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Open Date"
              value={field.value || null}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  required: false,
                },
              }}
            />
          )}
        />
        <br />
        <br />
        <Controller
          name="closeDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Close Date"
              value={field.value || null}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  required: false,
                },
              }}
            />
          )}
        />
        <br />
        <br />
        <Button type={"submit"} color="primary" variant="contained">
          Submit
        </Button>
        <br />
        <br />
        <Alert severity="info">
          <pre>{formData}</pre>
        </Alert>
      </LocalizationProvider>
    </form>
  );
}
