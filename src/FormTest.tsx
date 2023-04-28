import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

interface Cohort {
  id: number;
  name: string;
}

interface ArmType {
  id: number;
  value: string;
}

interface FormInput {
  branch: string;
  cohort: Cohort;
  type: ArmType;
}

export  const branches = ["NOB", "POB"];
export const cohorts = [
  { id: 1, name: "Cohort 1" },
  { id: 2, name: "Cohort 2" },
];
export const armTypes: ArmType[] = [
  { id: 1, value: "Arm Type 1" },
  { id: 2, value: "Arm Type 2" },
];

const schema = Yup.object({
  branch: Yup.string().required("branch is Required"),
  cohort: Yup.mixed().required("cohort is Required"),
  type: Yup.mixed().required("Arm Type is Required"),
});
export default function FormTest() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
          type: armTypes[0],
        })
    }, 2000);
  }, []);
  const submitData: SubmitHandler<FormInput> = (data) => {
    console.log("form data:" + data);
  };

  return (
    <Paper sx={{ p: 5 }}>
      <Typography variant="h4"> Form Test:</Typography> <br />
      <form onSubmit={handleSubmit(submitData)} noValidate>
        {/* Branch */}
        <Controller
          control={control}
          name="branch"
          render={({ field: { value } }) => (
            <Autocomplete
              fullWidth
              id="branch"
              options={branches}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Branch"
                  variant="filled"
                  required
                />
              )}
            />
          )}
        />

        {/* Cohort */}
        <Controller
          control={control}
          name="cohort"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              fullWidth
              id="cohort"
              onChange={(event, newValue) => onChange(newValue)}
              value={value || null}
              options={cohorts ?? []}
              getOptionLabel={(cohort) => (cohort.name ? cohort.name : "")}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cohort"
                  variant="filled"
                  error={!!errors.cohort}
                  helperText={errors.cohort && "Cohort is required"}
                  required
                />
              )}
            />
          )}
        />

        {/* Arm */}
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField
              select
              fullWidth
              defaultValue=""
              label="Arm Type"
              variant="filled"
              {...field}
            >
              {armTypes?.map((armType) => (
                <MenuItem key={armType.id} value={armType.id}>
                  {armType.value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button type={"submit"} color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
}
