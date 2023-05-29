import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import {
  Autocomplete,
  Button,
  Dialog,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import "./App.css";

interface Site {
  id: number;
  name: string;
}

const sites: Site[] = [
  {
    id: 1,
    name: "Boston Hospital",
  },
  {
    id: 2,
    name: "DC Hospital",
  },
  {
    id: 3,
    name: "Ny Hospital",
  },
];

interface EditPrimaryOutcomeDialogInput {
  nihResponsibleParty: string;
  responsiblePartyName: string;
  genomicDataShare: string;
  completionDate: string;
  site: Site;
}

const schema = Yup.object({
  nihResponsibleParty: Yup.string().required(
    "NIH Responsible Party is Required"
  ),
  responsiblePartyName: Yup.string().when("nihResponsibleParty", {
    is: false,
    then: Yup.string().required("Responsible Party Name is Required"),
  }),
  genomicDataShare: Yup.string().required("New Genomic DataShare is Required"),
});

export default function DialogDemo() {
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<EditPrimaryOutcomeDialogInput>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const nihResponsibleParty = watch("nihResponsibleParty");
  const updateResponsibleParty: SubmitHandler<EditPrimaryOutcomeDialogInput> = (
    data
  ) => {
    console.log(data);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue("nihResponsibleParty", "No", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("responsiblePartyName", "Test Party Name", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(
      "site",
      {
        id: 1,
        name: "Boston Hospital",
      } as Site,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  }, [open]);

  return (
    <div className="App">
      <Typography variant="h4"> Dialog Test:</Typography> <br />
      <Button onClick={() => setOpen(true)} variant={"contained"}>
        Open Dialog
      </Button>
      <Dialog open={open}>
        <form onSubmit={handleSubmit(updateResponsibleParty)} noValidate>
          <DialogTitle
            id="form-dialog-title"
            className="custom-head-primary custom-flex-justify-center"
          >
            Update Responsible Party
          </DialogTitle>
          <Divider />
          <DialogContent>
            {/* Site */}
            <Controller
              control={control}
              name="site"
              render={({ field: { value } }) => (
                <Autocomplete
                  fullWidth
                  id="site"
                  options={sites}
                  getOptionLabel={(site) => (site.name ? site.name : "")}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Site"
                      variant="filled"
                      error={!!errors.site}
                      helperText={errors.site && errors.site.message}
                      required
                    />
                  )}
                />
              )}
            />
            {/* NIH Responsible Party */}
            <Grid container className="customRowMarginTop">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={10}
                xl={10}
                style={{ padding: "20px" }}
              >
                Is the NIH (Intramural Program) the responsible party for
                registering the protocol with Clinicaltrials.gov?
                <Controller
                  name="nihResponsibleParty"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>
            </Grid>
            {/* Responsible Party Name */}
            {nihResponsibleParty === "No" && (
              <Grid container className="customRowMarginTop">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={10}
                  xl={10}
                  style={{ padding: "20px" }}
                >
                  <Controller
                    name="responsiblePartyName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Responsible Party Name"
                        variant="filled"
                        placeholder="Responsible Party Name"
                        error={errors.responsiblePartyName !== undefined}
                        helperText={
                          errors.responsiblePartyName &&
                          errors.responsiblePartyName.message
                        }
                        required={nihResponsibleParty === "No"}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
            {/* Genomic Data Share */}
            <Grid container className="customRowMarginTop">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={10}
                xl={10}
                style={{ padding: "20px" }}
              >
                Does the NIH Genomic Data Sharing Policy apply to this protocol?
                <Controller
                  name="genomicDataShare"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <RadioGroup>
                      <FormControlLabel
                        onChange={onChange}
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        onChange={onChange}
                        value="false"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>
            </Grid>
            <Controller
              name="completionDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns} {...field}>
                  <DesktopDatePicker
                    label="Completion Date"
                    {...field}
                    slotProps={{
                      textField: {
                        required: false,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </DialogContent>

          <Divider />
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button
              variant={"contained"}
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
