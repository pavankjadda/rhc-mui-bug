import {
  Alert,
  Autocomplete,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Cohort {
  id: number;
  name: string;
  cohortType?: CohortType;
}

interface CohortType {
  id: number;
  value: string;
}

interface FormInput {
  branch: string;
  cohort: Cohort;
}

export const branches = ["NOB", "POB"];
export const cohorts: Cohort[] = [
  { id: 1, name: "Cohort 1" },
  { id: 2, name: "Cohort 2" },
];

const schema = z.object({
  branch: z.string().min(1, { message: "Branch is required" }),
  cohort: z.object({ id: z.number(), name: z.string() }),
});

export default function ZodFormTest() {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        branch: branches[0],
      });
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
          render={() => (
            <Autocomplete
              fullWidth
              id="branch"
              options={branches}
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
        />{" "}
        <br />
        {/* Cohort */}
        {
          <Controller
            control={control}
            name="cohort"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                fullWidth
                id="cohort"
                options={cohorts ?? []}
                getOptionLabel={(cohort) => (cohort.name ? cohort.name : "")}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                onChange={(event, values) => onChange(values)}
                value={value || null}
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
        }
        <br />
        <Button type={"submit"} color="primary">
          Submit
        </Button>
      </form>
      <Alert severity="info">
        <pre>{JSON.stringify(getValues(), null, 2)}</pre>
      </Alert>
    </Paper>
  );
}
