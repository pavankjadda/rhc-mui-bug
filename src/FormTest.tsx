import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

interface Cohort {
  id: number;
  name: string;
}

interface FormInput {
  branch: string;
  cohort: Cohort;
}

const schema = Yup.object({
  branch: Yup.string().required("branch is Required"),
  cohort: Yup.mixed().required("cohort is Required"),
});
export default function FormTest() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const branches = ["NOB", "POB"];
  const cohorts = [
    { id: 1, name: "Cohort 1" },
    { id: 2, name: "Cohort 2" },
  ];

  const submitData: SubmitHandler<FormInput> = (data) => {
    console.log("form data:" + data);
  };

  return (
    <Paper>
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

        <Button type={"submit"} color="primary">
          Submit
        </Button>
      </form>
    </Paper>
  );
}
