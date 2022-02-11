import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";
import Button from "@material-ui/core/Button";

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
  adminTableBtn: {
    backgroundColor: "#405cf5",
    borderRadius: "6px",
    borderWidth: "0",
    boxShadow:
      "rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
    textOverflow: "none",
    overflow: "hidden",
    textTransform: "none",
    transform: "translateZ(0)",
    transition: "all .2s,box-shadow .08s ease-in",
    padding: "10px",
  },
});

function createData(sname, accept, reject) {
  return { sname, accept, reject };
}

const rows = [
  createData("Anuj Agrawal", "Accept", "Reject"),
  createData("Arnav Ranjan", "Accept", "Reject"),
];

// const head = ["Book Name", "Library", "Due Date"];

export default function AdminDashboardTable() {
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
              <TableCell className={classes.tHead}>Student Name</TableCell>
              <TableCell className={classes.tHead}>Accept</TableCell>
              <TableCell className={classes.tHead}>Reject</TableCell>
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
              <TableRow key={row.sname}>
                <TableCell component="th" scope="row">
                  {row.sname}
                </TableCell>
                <TableCell>
                  <button className={classes.adminTableBtn}>
                    {row.accept}
                  </button>
                </TableCell>
                <TableCell>
                  <button className={classes.adminTableBtn}>
                    {row.reject}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
