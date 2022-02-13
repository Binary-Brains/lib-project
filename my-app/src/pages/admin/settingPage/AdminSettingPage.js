import React, { useEffect, useState } from "react";
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
import AvatarComp from "../../../components/student/AvatarComp";
import { makeStyles } from "@material-ui/core/styles";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import AdminSettingForm from "./AdminSettingPageForm";
import { StateCity } from "../../../data/StateCity";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import PropTypes from "prop-types";
import moment from "moment";
import { updateAdmin } from "../../../actions/admin/auth";


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



function AdminSettingDrawer({adminRegister}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [name, setName] = useState(adminRegister.adminInfo && adminRegister.adminInfo.admin_name);
  const [contact, setContact] = useState(adminRegister.adminInfo && adminRegister.adminInfo.admin_contact)
  const [country, setCountry] = useState(adminRegister.adminInfo && adminRegister.adminInfo.admin_state);
  const [region, setRegion] = useState( adminRegister.adminInfo &&  adminRegister.adminInfo.admin_city);
  const [dob, setDob] = useState( adminRegister.adminInfo &&  moment(adminRegister.adminInfo.admin_dob).format('DD-MM-YYYY'))
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const [details, setDetails] = useState()

  useEffect(() => {
    setDetails({
      admin_name: name,
      admin_contact: contact,
      admin_state: country,
      admin_city: region,
      admin_dob: dob
    })
  }, [name, contact, country, region, dob])
  

  const handleUpdate = async (e) => {
    e.preventDefault()
    const res = await window.confirm("Are you sure?");
    if(res) dispatch(updateAdmin(details))
  }
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    //setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
    //setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const fieldItems = [
    {
      id: "name",
      label: "Name",
      name: "name",
      type: "text",
      value: name,
      setFunc: setName,
      autoFocus: true,
    },
    {
      id: "contact",
      label: "Contact No",
      name: "admin_contact",
      value: contact,
      setFunc: setContact,
      type: "number",
    }
  ];
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
        <AdminSettingForm data={fieldItems} />
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
                value={dob}
                required
                fullWidth
                onChange={(e) => {
                  setDob(e.target.value)
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


AdminSettingDrawer.propTypes = {
  adminRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
});

export default connect(mapStateToProps)(AdminSettingDrawer);