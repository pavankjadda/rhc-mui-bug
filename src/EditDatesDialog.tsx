import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Grid } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import styles from "../../../protocol-documents/document-upload-dialog/DocumentUploadDialog.module.scss";

export interface EditMetaDataManagerDialogProps {
  onClose: () => void;
  open: boolean;
}

interface EditDatesDialogInput {
  openDate: string;
  closeDate: string;
  latestAmendmentVersionDate: string;
  irbApprovalDate: string;
}

const schema = Yup.object({
  openDate: Yup.string().notRequired(),
  closeDate: Yup.string().notRequired(),
  latestAmendmentVersionDate: Yup.string().notRequired(),
  irbApprovalDate: Yup.string().notRequired(),
});

export default function EditDatesDialog(props: EditMetaDataManagerDialogProps) {
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const dispatch = useDispatch();
  const maxDate = new Date();
  const { control, reset, handleSubmit } = useForm<EditDatesDialogInput>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    reset({
      // openDate: props.protocol?.openDate ?? undefined,
      // closeDate: props.protocol?.closeDate ?? undefined,
      // latestAmendmentVersionDate: props.protocol?.latestAmendmentVersionDate ?? undefined,
      // irbApprovalDate: props.protocol?.irbApprovalDate ?? undefined,
      irbApprovalDate: "2023-01-22",
    });
  }, [props.open]);
  const updateDates: SubmitHandler<EditDatesDialogInput> = (data) => {};
  return (
    <Dialog
      open={props.open}
      disableEscapeKeyDown={true}
      onClose={() => props.onClose()}
      fullWidth={true}
      maxWidth={maxWidth}
      classes={{ paper: styles.dialog }}
      aria-labelledby="Update Dates"
    >
      <form onSubmit={handleSubmit(updateDates)} noValidate>
        <DialogTitle
          id="form-dialog-title"
          className="custom-head-primary custom-flex-justify-center"
        >
          Update Dates
        </DialogTitle>
        <Divider />
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* Open and Close Dates */}
            <Grid container className="customRowMarginTop">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ p: 2 }}>
                <Controller
                  name="openDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Open Date"
                      value={field.value || null}
                      maxDate={maxDate.toISOString()}
                      slotProps={{
                        textField: {
                          required: false,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ p: 2 }}>
                <Controller
                  name="closeDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Close Date"
                      value={field.value || null}
                      maxDate={maxDate.toISOString()}
                      slotProps={{
                        textField: {
                          required: false,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Latest Amendment Version Date and IRB Approval Date */}
            <Grid container className="customRowMarginTop">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ p: 2 }}>
                <Controller
                  name="latestAmendmentVersionDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Latest Amendment Version Date"
                      value={field.value || null}
                      maxDate={maxDate.toISOString()}
                      slotProps={{
                        textField: {
                          required: false,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ p: 2 }}>
                <Controller
                  name="irbApprovalDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="IRB Approval Date"
                      value={field.value || null}
                      maxDate={maxDate.toISOString()}
                      slotProps={{
                        textField: {
                          required: false,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>

        <Divider />
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
