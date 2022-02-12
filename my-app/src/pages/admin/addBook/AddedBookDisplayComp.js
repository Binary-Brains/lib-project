import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import SearchBar from "material-ui-search-bar";
// import { Tab } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: "25px",
  },
  // tCont: {
  //   ["@media (max-width:780px)"]: {
  //     width: "650px",
  //   },
  //   ["@media (max-width:600px)"]: {
  //     width: "420px",
  //   },
  //   ["@media (max-width:500px)"]: {
  //     width: "380px",
  //   },
  //   ["@media (max-width:400px)"]: {
  //     width: "300px",
  //   },
  //   ["@media (max-width:300px)"]: {
  //     width: "270px",
  //   },
  // },
  tHead: {
    fontSize: "19px",
    fontWeight: "bold",
    color: "blue",
  },
  boxCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableHead: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#883AB1",
  },
});

export default function ComplexGrid({ data }) {
  var headArray = Object.keys(data[0]);
  const classes = useStyles();
  return (
    <Box className={classes.boxCard}>
      <Paper sx={{ p: 2, flexGrow: 1 }}>
        <TableContainer className={classes.tCont}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>Book Name</TableCell>
                <TableCell className={classes.tableHead}>Author Name</TableCell>
                <TableCell className={classes.tableHead}>
                  Publisher Name
                </TableCell>
                <TableCell className={classes.tableHead}>
                  Number of Pages
                </TableCell>
                <TableCell className={classes.tableHead}>
                  Stock Available
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((e) => (
                <TableRow key={e.name}>
                  {headArray.map((ele) => {
                    console.log(ele);
                    return (
                      <TableCell component="th" scope="row">
                        {e[ele]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
