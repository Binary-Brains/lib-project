import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
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
    id: "pname",
    label: "Publisher Name",
    name: "book_publisher",
    type: "text",
  },

  {
    id: "page",
    label: "Total Pages",
    name: "book_pages",
    type: "number",
  },
  {
    id: "stock",
    label: "Stock",
    name: "book_stock",
    type: "number",
  },
];

export default function AddBookForm({ addBooks, closeModal }) {
  const classes = useStyles();
  const [details, setDetails] = useState({});

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
            Add Book
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
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddBook}>
              Add Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
