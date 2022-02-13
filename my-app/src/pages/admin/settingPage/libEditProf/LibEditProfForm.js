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
import { StateCity } from "../../../../data/StateCity";
import LibForm from "./LibEditProfFormMap";
import { loadLibrary, updateLibrary } from "../../../../actions/admin/library";
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

function LibEditProfile({ libraryRegister }) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [country, setCountry] = useState(
    libraryRegister.libraryInfo && libraryRegister.libraryInfo.library_state
  );
  const [region, setRegion] = useState(
    libraryRegister.libraryInfo && libraryRegister.libraryInfo.library_city
  );
  const [name, setName] = useState(
    libraryRegister.libraryInfo && libraryRegister.libraryInfo.library_name
  );
  const [contact, setContact] = useState(
    libraryRegister.libraryInfo && libraryRegister.libraryInfo.library_contact
  );
  const [lendingPeriod, setLendingPeriod] = useState(
    libraryRegister.libraryInfo && libraryRegister.libraryInfo.lending_period
  );
  const [fine, setFine] = useState(
    libraryRegister.libraryInfo && libraryRegister.libraryInfo.fine
  );
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const fieldItems = [
    {
      id: "library_name",
      label: "Library Name",
      name: "name",
      type: "text",
      value: name,
      setFunc: setName,
      autoFocus: true,
    },
    {
      id: "lending_period",
      label: "Lending Period (in days)",
      name: "lending_period",
      type: "text",
      value: lendingPeriod,
      setFunc: setLendingPeriod,
      autoFocus: true,
    },
    {
      id: "fine",
      label: "Fine (INR)/day",
      name: "fine",
      type: "text",
      value: fine,
      setFunc: setFine,
      autoFocus: true,
    },
    {
      id: "library_contact",
      label: "Library Contact No",
      name: "admin_contact",
      value: contact,
      setFunc: setContact,
      type: "number",
    },
  ];

  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails({
      library_name: name,
      library_contact: contact,
      library_state: country,
      library_city: region,
      lending_period: lendingPeriod,
      fine: fine
    });
  }, [name, contact, country, region, fine, lendingPeriod]);

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
    if (res) await dispatch(updateLibrary(details));
    dispatch(loadLibrary(libraryRegister.libraryInfo._id));
  };
  return (
    <>
      <Grid item xs={12} className={classes.editProf}>
        <AvatarComp />
      </Grid>

      <Typography component="h1" variant="h5" className={classes.editProf}>
        Edit Library Profile
      </Typography>
      <LibForm data={fieldItems} />
      <Grid container>
        <form className={classes.form} noValidate>
          <Grid item xs={12} mt={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>State</InputLabel>
              <Select
                required
                value={country}
                onChange={handleChangeCountry}
                name="library_state"
                id="state"
                label="State"
                disabled={true}
              >
                {StateCity.states.map((item) => (
                  <MenuItem value={item.state}>{item.state}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2} mb={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>City</InputLabel>
              <Select
                required
                value={region}
                onChange={handleChangeRegion}
                disabled={!country}
                disabled={true}
                name="library_city"
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

export default LibEditProfile;
