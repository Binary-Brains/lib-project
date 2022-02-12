import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import PhoneNoField from "../../../components/student/PhoneNoField";
import AvatarComp from "../../../components/student/AvatarComp";
import { makeStyles } from "@material-ui/core/styles";
import Form from "../../../components/Form";
import AdminNavbar from "../../../components/admin/AdminNavbar";

const useStyles = makeStyles(() => ({
  form: {
    width: "60%",
    margin: "auto",
    // ["@media (max-width:600px)"]: {
    //   width: "100%",
    // },
  },
  editProf: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const fieldItems = [
  {
    id: "name",
    label: "Name",
    name: "name",
    type: "text",
    autoFocus: true,
  },
  {
    id: "state",
    label: "State",
    name: "state",
    type: "text",
  },
  {
    id: "city",
    label: "City",
    name: "city",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    type: "password",
  },
];

export default function AdminSettingDrawer() {
  const classes = useStyles();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={8}>
        <Grid item xs={12} className={classes.editProf}>
          <AvatarComp />
        </Grid>

        <Typography component="h1" variant="h5" className={classes.editProf}>
          Edit Profile
        </Typography>
        <Form data={fieldItems} />
        <Grid container>
          <form className={classes.form} noValidate>
            <Grid item xs={12} mt={2}>
              <PhoneNoField />
            </Grid>
            <Grid item xs={12} mt={2} mb={2}>
              <TextField
                onFocus={onFocus}
                onBlur={onBlur}
                variant="outlined"
                required
                fullWidth
                onChange={(e) => {
                  if (e.target.value) setHasValue(true);
                  else setHasValue(false);
                }}
                label="Dob"
                type={hasValue || focus ? "date" : "text"}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              mt={2}
              className={classes.fields}
              //onClick={handelLogin}
            >
              Update Profile
            </Button>
          </form>
        </Grid>
      </Box>
    </Box>
  );
}
