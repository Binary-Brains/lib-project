import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
// import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  form: {
    width: "80%",
    margin: "auto",
  },

  fields: {
    marginTop: "20px",
  },
}));

const data = [
  {
    id: "bname",
    label: "Book Name",
    name: "book_name",
    type: "text",
    autoFocus: true,
  },
  {
    id: "aname",
    label: "Author Name",
    name: "book_author",
    type: "text",
  },
  {
    id: "page",
    label: "Total Pages",
    name: "book_pages",
    type: "number",
  },
];

export default function AssignNewBookForm({ addBooks, closeModal }) {
  const classes = useStyles();
  const [details, setDetails] = useState({});
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    closeModal();
    addBooks(details);
    setDetails({});
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <Grid container>
          <Typography component="h1" variant="h5" className={classes.addBook}>
            Assign New Book
          </Typography>
          <Grid item xs={12}>
            {data.map((item) => {
              return (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  className={classes.fields}
                  id={item.id}
                  label={item.label}
                  name={item.name}
                  type={item.type}
                  autoFocus={item.autoFocus}
                  onChange={(e) => onChange(e)}
                />
              );
            })}
          </Grid>
          <Grid item xs={12} mt={3} mb={3}>
            <TextField
              onFocus={onFocus}
              onBlur={onBlur}
              variant="outlined"
              name="admin_dob"
              required
              fullWidth
              onChange={(e) => {
                if (e.target.value) setHasValue(true);
                else setHasValue(false);
              }}
              label="Return Date"
              type={hasValue || focus ? "date" : "text"}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddBook}>
              Issue
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
