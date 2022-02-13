import React from "react";
import AvatarComp from "../../components/admin/AvatarComp";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../assests/signInBg.jpg";
import GoogleAuth from "../../components/admin/GoogleAuth";
// import TransitionAlert from "../../components/admin/Alert";
import { AdminSignin } from "../../actions/admin/auth";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cookies from "js-cookie";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//import users from "./../../data/users";
//import authService from "./../service/authService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        LMS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
  studentNotAccount: {
    justifyContent: "flex-end",

    ["@media (max-width:650px)"]: {
      marginLeft: "0px",
      marginTop: "10px",
    },
  },
}));

function SignInAdmin({ title, adminRegister }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  const classes = useStyles();
  console.log(location);
  Cookies.remove("li_at");
  //console.log(typeof classes.root);

  const [account, setAccount] = React.useState({
    admin_email: "",
    admin_password: "",
    remember_me: false,
  });

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handelLogin = (e) => {
    e.preventDefault();
    dispatch(AdminSignin(account));
  };

  const { loading, isAuthenticated } = adminRegister;

  if (isAuthenticated) setLocation("/admin/dashboard");

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
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
            {title} SignIn
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="admin_email"
              onChange={(e) => onChange(e)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="admin_password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  name="remember_me"
                  onChange={(e) => onChange(e)}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handelLogin(e)}
              disabled={loading ? true : false}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <Link href="/admin/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Link
                  href="/admin/signup"
                  variant="body2"
                  className={classes.studentNotAccount}
                >
                  {"Are you a Student? Sign in as Student"}
                </Link>
              </Grid>
            </Grid>
            <GoogleAuth />
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

SignInAdmin.propTypes = {
  adminRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
});

export default connect(mapStateToProps)(SignInAdmin);
