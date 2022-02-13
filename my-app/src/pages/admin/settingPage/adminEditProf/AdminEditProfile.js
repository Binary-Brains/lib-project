import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AvatarComp from "../../../../components/student/AvatarComp";
import { makeStyles } from "@material-ui/core/styles";
import AdminSettingForm from "./AdminSettingPageForm";
import { StateCity } from "../../../../data/StateCity";
import moment from "moment";
import { updateAdmin } from "../../../../actions/admin/auth";
import { useDispatch } from "react-redux";

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
    id: "admin_name",
    label: "Admin Name",
    name: "name",
    type: "text",
    autoFocus: true,
  },
  {
    id: "admin_contact",
    label: "Admin Contact No",
    name: "admin_contact",
    type: "number",
  },
  {
    id: "admin_password",
    label: "Password",
    name: "password",
    type: "password",
  },
];

function AdminEditProfile({ adminRegister }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [name, setName] = useState(adminRegister && adminRegister.admin_name);
  const [contact, setContact] = useState(
    adminRegister && adminRegister.admin_contact
  );
  const [country, setCountry] = useState(
    adminRegister && adminRegister.admin_state
  );
  const [region, setRegion] = useState(
    adminRegister && adminRegister.admin_city
  );
  const [dob, setDob] = useState(
    adminRegister && moment(adminRegister.admin_dob).format("DD-MM-YYYY")
  );
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const fieldItems = [
    {
      id: "admin_name",
      label: "Admin Name",
      name: "name",
      type: "text",
      value: name,
      setFunc: setName,
      autoFocus: true,
    },
    {
      id: "admin_contact",
      label: "Admin Contact No",
      name: "admin_contact",
      value: contact,
      setFunc: setContact,
      type: "number",
    },
  ];

  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails({
      admin_name: name,
      admin_contact: contact,
      admin_state: country,
      admin_city: region,
      admin_dob: dob,
    });
  }, [name, contact, country, region, dob]);

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
    const res = await window.confirm("Are you sure?");
    if (res) dispatch(updateAdmin(details));
  };
  return (
    <>
      <Grid item xs={12} className={classes.editProf}>
        <AvatarComp />
      </Grid>

      <Typography component="h1" variant="h5" className={classes.editProf}>
        Edit Admin Profile
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
              required
              fullWidth
              value={dob}
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
    </>
  );
}

export default AdminEditProfile;
