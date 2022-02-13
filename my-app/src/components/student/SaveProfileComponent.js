import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import AvatarComp from "./AvatarComp";
import Navbar from "./Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { StateCity } from "../../data/StateCity";
// import { useLocation } from 'wouter';

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

function SaveProfile() {
  const classes = useStyles();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    //setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
    //setAccount({ ...account, [event.target.name]: event.target.value });
  };

  //const { studentInfo } = userRegister;
  const fieldItems = [
    {
      id: "name",
      label: "Name",
      name: "name",
      type: "text",
      value: "Rishabh Mishra",
      autoFocus: true,
    },
    {
      id: "contact",
      label: "Contact No",
      name: "admin_contact",
      type: "number",
      value: "8840576544"
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={8}>
        <Grid item xs={12} className={classes.editProf}>
          <AvatarComp />
        </Grid>

        <Typography component="h1" variant="h5" className={classes.editProf}>
          Please Add Profile Data
        </Typography>
        <>
          <Grid container>
            <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs={12}>
                  {fieldItems.map((item) => {
                    return (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        //onChange={(e) => onChange(e)}
                        className={classes.fields}
                        id={item.id}
                        label={item.label}
                        name={item.name}
                        type={item.type}
                        value={item.value}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
        <Grid container>
          <form className={classes.form} noValidate>
            <Grid item xs={12} mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>State</InputLabel>
                <Select
                  required
                  value={country}
                  onChange={handleChangeCountry}
                  name="admin_state"
                  id="state"
                  label="State"
                >
                  {StateCity.states.map((item) => (
                    <MenuItem value={item.state}>{item.state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>City</InputLabel>
                <Select
                  required
                  value={region}
                  onChange={handleChangeRegion}
                  disabled={!country}
                  name="admin_city"
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

SaveProfile.propTypes = {
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(SaveProfile);
