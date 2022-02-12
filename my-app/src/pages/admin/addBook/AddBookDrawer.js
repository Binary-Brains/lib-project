import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import AddBookModal from "../../../components/admin/AddBookModal";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ComplexGrid from "./AddedBookDisplayComp";

const useStyles = makeStyles(() => ({
  btnCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  addBookBtn: {
    marginRight: "20px",
  },
}));

export default function MiniDrawerDash() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);

  const addBooks = (obj) => {
    setBooks([...books, obj]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
          fontSize={25}
        >
          {books && books.length > 0 ? (
            <ComplexGrid data={books} />
          ) : (
            "Please add book"
          )}
        </Typography>

        <Grid container className={classes.btnCont}>
          <Grid item className={classes.addBookBtn}>
            <AddBookModal addBooks={addBooks} />
          </Grid>
          <Grid item>
            {books && books.length > 0 ? (
              <Button variant="contained" color="primary">
                Submit
              </Button>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
