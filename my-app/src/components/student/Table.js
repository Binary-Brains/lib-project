import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";
import { Tab } from "@mui/material";

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

export default function DashboardTable({ data }) {
  var headArray = Object.keys(data[0]);
  const classes = useStyles();
  return (
    <>
      <TableContainer className={classes.tCont}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headArray.map((ele) => {
                return <TableCell className={classes.tHead}>{ele}</TableCell>;
              })}
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
    </>
  );
}
