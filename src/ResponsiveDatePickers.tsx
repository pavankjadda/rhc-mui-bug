import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { parseISO } from "date-fns";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

interface EditDatesDialogInput {
  openDate: Date;
  closeDate: Date;
  latestAmendmentVersionDate: Date;
  irbApprovalDate: Date;
}

const schema = Yup.object({
  openDate: Yup.date().notRequired(),
  closeDate: Yup.date().notRequired(),
  latestAmendmentVersionDate: Yup.date().notRequired(),
  irbApprovalDate: Yup.date().notRequired(),
});

export default function ResponsiveDatePickers() {
  const { control, setValue, getValues, reset } = useForm<EditDatesDialogInput>(
    {
      resolver: yupResolver(schema),
      mode: "all",
    }
  );

  React.useEffect(() => {
    //setValue("openDate", "");
    //setValue("closeDate", "01/11/2023");

    reset({
      openDate: parseISO("2023-01-22"),
      closeDate: undefined,
    });
  }, []);
  console.log("getValues", getValues());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
    </LocalizationProvider>
  );
}
