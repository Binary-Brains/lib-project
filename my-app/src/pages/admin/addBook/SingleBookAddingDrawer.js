import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import Form from "../../../components/Form";

const useStyles = makeStyles(() => ({
  form: {
    width: "60%",
    margin: "auto",
    marginTop: "15px",
    ["@media (max-width:600px)"]: {
      width: "100%",
    },
  },
  addBook: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const fieldItems = [
  {
    id: "bname",
    label: "Book Name",
    name: "bname",
    type: "text",
    autoFocus: true,
  },
  {
    id: "aname",
    label: "Author Name",
    name: "aname",
    type: "text",
  },
  {
    id: "pname",
    label: "Publisher Name",
    name: "pname",
    type: "text",
  },

  {
    id: "page",
    label: "Total Pages",
    name: "page",
    type: "number",
  },
  {
    id: "stock",
    label: "Stock",
    name: "stock",
    type: "number",
  },
];

export default function MiniDrawerDash() {
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
        <Grid item xs={12} className={classes.addBook} alignItems="center">
          <Avatar sx={{ bgcolor: red[500] }}>
            <AddIcon />
          </Avatar>
        </Grid>

        <Typography component="h1" variant="h5" className={classes.addBook}>
          Add Book
        </Typography>
        <Form data={fieldItems} />
        <form className={classes.form} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            //onClick={handelLogin}
          >
            Add Book
          </Button>
        </form>
      </Box>
    </Box>
  );
}
