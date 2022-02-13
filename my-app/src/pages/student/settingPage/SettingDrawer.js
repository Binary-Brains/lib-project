import React, { useEffect, useState } from "react";
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
import PhoneNoField from "../../../components/student/PhoneNoField";
import AvatarComp from "../../../components/student/AvatarComp";
import Navbar from "../../../components/student/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import StudentSettingForm from "./StudentSettingForm";
import { StateCity } from "../../../data/StateCity";
import moment from "moment";
import { updateStudent } from "../../../actions/student/auth";
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

function SettingDrawer({ userRegister }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [country, setCountry] = useState(
    userRegister.studentInfo.student_state
  );
  const [name, setName] = useState(userRegister.studentInfo.student_name);
  const [contact, setContact] = useState(
    userRegister.studentInfo.student_contact
  );
  const [dob, setDob] = useState(
    moment(userRegister.studentInfo.student_dob).format("DD-MM-YYYY")
  );
  const [region, setRegion] = useState(userRegister.studentInfo.student_city);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = window.confirm("Are you sure?");
    if (res) dispatch(updateStudent(details));
  };

  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails({
      student_name: name,
      student_contact: contact,
      student_dob: dob,
      student_city: region,
      student_state: country,
    });
  }, [name, contact, dob, region, country]);

  //const { studentInfo } = userRegister;
  const fieldItems = [
    {
      id: "name",
      label: "Name",
      name: "name",
      type: "text",
      autoFocus: true,
      value: name,
      onClickFunc: setName,
    },
    {
      id: "contact",
      label: "Contact No",
      name: "admin_contact",
      type: "number",
      value: contact,
      onClickFunc: setContact,
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
          Edit Profile
        </Typography>
        <StudentSettingForm data={fieldItems} />
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
                value={dob}
                fullWidth
                onChange={(e) => {
                  setDob(e.target.value);
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
              onClick={(e) => handleUpdate(e)}
            >
              Update Profile
            </Button>
          </form>
        </Grid>
      </Box>
    </Box>
  );
}

SettingDrawer.propTypes = {
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(SettingDrawer);
