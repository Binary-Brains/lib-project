import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: "25px",
  },
  tCont: {
    ["@media (max-width:780px)"]: {
      width: "650px",
    },
    ["@media (max-width:600px)"]: {
      width: "420px",
    },
    ["@media (max-width:500px)"]: {
      width: "380px",
    },
    ["@media (max-width:400px)"]: {
      width: "300px",
    },
    ["@media (max-width:300px)"]: {
      width: "270px",
    },
  },
  tHead: {
    fontSize: "19px",
    fontWeight: "bold",
    color: "blue",
  },
});

function createData(bname, lib, ddate) {
  return { bname, lib, ddate };
}

const rows = [
  createData("Concepts of Physiscs", "NIT Patna", "15-07-2022"),
  createData("RD Sharma", "NIT Raipur", "15-07-2022"),
];

// const head = ["Book Name", "Library", "Due Date"];

export default function FeedTable() {
  const classes = useStyles();

  // const [rows, setRows] = useState(rows);
  // const [searched, setSearched] = useState("");

  // const requestSearch = (searchedVal) => {
  //   const filteredRows = rows.filter((row) => {
  //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //   });
  //   setRows(filteredRows);
  // };

  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

  return (
    <>
      <TableContainer className={classes.tCont}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tHead}>Book Name</TableCell>
              <TableCell className={classes.tHead}>Library Name</TableCell>
              <TableCell className={classes.tHead}>Due Date</TableCell>
              {/* <TableCell>
                {/* <SearchBar
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                /> */}
              {/* </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.bname}>
                <TableCell component="th" scope="row">
                  {row.bname}
                </TableCell>
                <TableCell>{row.lib}</TableCell>
                <TableCell>{row.ddate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
