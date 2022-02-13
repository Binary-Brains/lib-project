import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AvatarComp from "../../components/student/AvatarComp";
import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../assests/signInBg.jpg";
// import PhoneNoField from "../../components/student/PhoneNoField";
import GoogleAuth from "../../components/student/GoogleAuth";
import { StudentSignup } from "../../actions/student/auth";
// import MuiPhoneNumber from "material-ui-phone-number";
import { useLocation } from "wouter";
// import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
// import { GridLoadingOverlay } from "@mui/x-data-grid";
import { StateCity } from "../../data/StateCity";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//import users from "./../../data/users";
//import authService from "./../service/authService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Library Desk
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  size: {
    marginTop: "25px",
    marginBottom: "25px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUpStudent({ title, userRegister }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  console.log(location);
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const [account, setAccount] = React.useState({
    student_name: "",
    student_email: "",
    student_contact: "",
    student_state: "",
    student_city: "",
    student_dob: "",
    student_password: "",
  });

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //create a function in the action folder and just call in the component it will save the user and return
    await dispatch(StudentSignup(account));

    //after successful signup user will be receiving a mail with a frontend link
    //from that link we have to get the id and send it to the backend to verify and then
    //http://localhost:3000/api/verify/6204d2a26212677ed8d38808
  };

  const { loading, isAuthenticated } = userRegister;

  if (userRegister.studentInfo) {
    if (isAuthenticated) setLocation("/student/dashboard");
    else {
      setLocation("/student/signin");
      dispatch(
        setAlert(
          `Hi!,${userRegister.studentInfo.student_name} an Email has been sent with a verification link!`,
          "success"
        )
      );
    }
  }

  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid
          className={classes.size}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={1}
          square
        >
          <div className={classes.paper}>
            <AvatarComp />
            <Typography component="h1" variant="h5">
              {title} SignUp
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="student_name"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => onChange(e)}
                    id="name"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => onChange(e)}
                    id="email"
                    label="Email Address"
                    name="student_email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={"number"}
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => onChange(e)}
                    id="contact"
                    label="Contact"
                    name="student_contact"
                    autoComplete="contact"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => onChange(e)}
                    id="state"
                    label="State"
                    name="student_state"
                    autoComplete="state"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>State</InputLabel>
                    <Select
                      required
                      value={country}
                      onChange={handleChangeCountry}
                      name="student_state"
                      id="state"
                      label="State"
                    >
                      {StateCity.states.map((item) => (
                        <MenuItem value={item.state}>{item.state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => onChange(e)}
                    id="city"
                    label="City"
                    name="student_city"
                    autoComplete="city"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>City</InputLabel>
                    <Select
                      required
                      value={region}
                      onChange={handleChangeRegion}
                      disabled={!country}
                      name="student_city"
                      id="city"
                      label="City"
                    >
                      {country
                        ? StateCity.states
                            .find(({ state }) => state === country)
                            .districts.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                            ))
                        : []}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onFocus={onFocus}
                    onBlur={onBlur}
                    variant="outlined"
                    name="student_dob"
                    required
                    fullWidth
                    onChange={(e) => {
                      if (e.target.value) setHasValue(true);
                      else setHasValue(false);
                      setAccount({
                        ...account,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    label="Dob"
                    type={hasValue || focus ? "date" : "text"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => onChange(e)}
                    name="student_password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I Accept the Terms and Conditions"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmit(e)}
                className={classes.submit}
                disabled={loading ? true : false}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/student/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <GoogleAuth />
              <Copyright mt={5} />
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

SignUpStudent.propTypes = {
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(SignUpStudent);
