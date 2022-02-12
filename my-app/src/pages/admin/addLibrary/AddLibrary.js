import React from "react";
import Box from "@material-ui/core/Box";
import Form from "../../../components/Form";
import PrimarySearchAppBar from "../../../components/student/TopNavOnly";
import { Avatar, Grid, Button } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import Link from "@material-ui/core/Link";
import PhoneNoField from "../../../components/student/PhoneNoField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  form: {
    width: "60%",
    margin: "auto",
    marginTop: "15px",
  },
  addBook: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    marginTop: "20px",
  },
}));

const addLibFieldItems = [
  {
    id: "name",
    label: "Library Name",
    name: "name",
    type: "text",
    autoFocus: true,
  },
  {
    id: "libaddress",
    label: "Library Address",
    name: "libaddress",
    type: "text",
  },
  {
    id: "state",
    label: "Library State",
    name: "state",
    type: "text",
  },
  {
    id: "city",
    label: "Library City",
    name: "city",
    type: "text",
  },
];

export default function AddLibrary() {
  const classes = useStyles();
  return (
    <>
      <Box>
        <PrimarySearchAppBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={3}>
          <Grid item xs={12} className={classes.addBook} alignItems="center">
            <Avatar sx={{ bgcolor: red[5000] }}>
              <AddIcon />
            </Avatar>
          </Grid>

          <Typography component="h1" variant="h5" className={classes.addBook}>
            Add Library
          </Typography>
          <Form data={addLibFieldItems} />
          <form className={classes.form} noValidate>
            <Grid item xs={12}>
              <PhoneNoField />
            </Grid>
            <Grid item>
              <Link href="/admin/dashboard">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  //onClick={handelLogin}
                >
                  Add Library
                </Button>
              </Link>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
}
