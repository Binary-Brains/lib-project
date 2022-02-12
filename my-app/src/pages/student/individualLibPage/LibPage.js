import { Button, Typography, Grid, Link } from "@mui/material";
import React from "react";
import PrimarySearchAppBar from "../../../components/student/TopNavOnly";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box } from "@mui/system";
import DashboardTable from "../../../components/student/Table";

const useStyles = makeStyles(() => ({
  libPageCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // libPageHeaders: {
  //   ["@media (max-width:900px)"]: {
  //     marginTop: "25px",
  //   },
  // },
  // goBackBtn: {
  //   ["@media (max-width:900px)"]: {
  //     display: "none",
  //   },
  // },
  // libPageTable: {
  //   display: "flex",
  //   ["@media (max-width:900px)"]: {
  //     alignItems: "center",
  //     width: "100%",
  //     justifyContent: "center",
  //   },
  //   ["@media (max-width:600px)"]: {
  //     alignItems: "center",
  //     width: "100%",
  //     justifyContent: "center",
  //   },
  //   ["@media (max-width:400px)"]: {
  //     alignItems: "center",
  //     width: "100%",
  //     justifyContent: "center",
  //   },
  // },
}));

const columns = [
  {
    field: "book_name",
    headerName: "Book Name",
    width: 500,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "book_stock",
    headerName: "Stock Available",
    width: 500,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    headerClassName: "super-app-theme--header",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="success"
          // onClick={(event) => {
          //   handleClick(event, cellValues);
          // }}
        >
          Reserve
        </Button>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    book_name: "HC Verma",
    book_stock: 500,
  },
  {
    id: 2,
    book_name: "HC Verma",
    book_stock: 500,
  },
  {
    id: 3,
    book_name: "RD Sharma",
    book_stock: 500,
  },
  {
    id: 4,
    book_name: "RD Sharma",
    book_stock: 500,
  },
];

export default function LibPage() {
  const classes = useStyles();
  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ display: "flex" }}>
        <Grid container className={classes.libPageCont} mt={7}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            align="center"
            className={classes.goBackBtn}
          >
            <Link href="/student/library/">
              <Button variant="contained" color="primary">
                <ArrowBackIcon /> &nbsp; Go Back
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={4} align="center">
            <Typography component="h1" variant="h5">
              NIT Patna Central Library
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            align="center"
            className={classes.libPageHeaders}
          >
            <Button variant="contained" color="primary">
              Send Request &nbsp;
              <IosShareIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Grid container mt={10}>
          <Grid item xs={12} sm={12} md={6} align="center">
            <Typography component="h1" variant="h5">
              Maximum Lending Period: 6 Months
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} align="center">
            <Typography component="h1" variant="h5">
              Connected Students: 300
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Grid conatiner md={12} className={classes.libPageTable}>
          <DashboardTable rows={rows} columns={columns} />
        </Grid>
      </Box>
    </>
  );
}
