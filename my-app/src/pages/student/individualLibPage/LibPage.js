import { Button, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
// import PrimarySearchAppBar from "../../../components/student/TopNavOnly";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box } from "@mui/system";
import DashboardTable from "../../../components/student/Table";
import { getLibraryData, reserveBook } from "../../../actions/student/library";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useLocation } from "wouter";
import Navbar from "../../../components/student/Navbar";
import CircularIndeterminate from "../../../components/Loader";

const useStyles = makeStyles(() => ({
  libPageCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  libPageHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    ["@media (max-width:400px)"]: {
      marginLeft: "50px",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
    },
  },
  libPageTable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    ["@media (max-width:900px)"]: {
      alignItems: "center",
      width: "75%",
      justifyContent: "center",
    },
    ["@media (max-width:600px)"]: {
      marginLeft: "50px",
      alignItems: "center",
      width: "75%",
      justifyContent: "center",
    },
    ["@media (max-width:500px)"]: {
      alignItems: "center",
      width: "75%",
      justifyContent: "center",
    },
    ["@media (max-width:480px)"]: {
      marginLeft: "80px",
      alignItems: "center",
      width: "80%",
      justifyContent: "flex-end",
    },
    ["@media (max-width:400px)"]: {
      alignItems: "center",
      width: "85%",
      justifyContent: "center",
    },
  },
}));

function LibPage({ id, libraryStudentRegister, userRegister }) {
  // console.log(libraryStudentRegister)
  const dispatch = useDispatch();
  const classes = useStyles();
  const [location, setLocation] = useLocation();
  console.log(location);

  const { libraryInfo, loading } = libraryStudentRegister;
  const { library_data, reserved_books } = libraryInfo;

  useEffect(() => {
    dispatch(getLibraryData({ library_id: id }));
  }, [dispatch, id]);

  const handleClick = async (e, cellValues) => {
    e.preventDefault();
    const res = window.confirm("Are you sure You want to reserve?");
    if (res) {
      await dispatch(
        reserveBook({ book_name: cellValues.row.book_name, library_id: id })
      );
      dispatch(getLibraryData({ library_id: id }));
    }
  };

  //make a list of all the reserved book and filter the reserve button from the page
  var reserveList = [];
  reserved_books &&
    reserved_books.map((book) => {
      reserveList.push(book.book_data[0].book_name);
      return 0;
    });

  //checks for the connected or a pending request user for this library
  console.log(userRegister.studentInfo.librarires);
  var connected = false;
  userRegister &&
    userRegister.studentInfo &&
    userRegister.studentInfo.librarires &&
    userRegister.studentInfo.librarires.map((lib) => {
      if (lib.library_id === id) connected = true;
      return 0;
    });

  var pendingRequest = false;
  userRegister &&
    userRegister.studentInfo &&
    userRegister.studentInfo.library_request &&
    userRegister.studentInfo.library_request.map((lib) => {
      if (lib.library_id === id) pendingRequest = true;
      return 0;
    });

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
    // this column is also based on the connected feature
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        if (connected && !pendingRequest) {
          const checkBook = reserveList.find(
            (ele) => ele === cellValues.row.book_name
          );
          if (!checkBook) {
            return (
              <Button
                variant="contained"
                color="success"
                onClick={(event) => {
                  handleClick(event, cellValues);
                }}
              >
                Reserve
              </Button>
            );
          } else {
            return <Typography align="center">Reserved</Typography>;
          }
        } else {
          return (
            <Typography align="center">You should be connected</Typography>
          );
        }
      },
    },
  ];

  const rows = [];

  let stockCounter = {},
    i = 0;
  //showing the stocks availble in the library
  libraryInfo.available_books &&
    libraryInfo.available_books.map(({ book_name, _id }, index) => {
      stockCounter[book_name] = (Number(stockCounter[book_name]) || 0) + 1;
      return 0;
    });

  for (const key in stockCounter) {
    let temp = { id: i++, book_name: key, book_stock: stockCounter[key] };
    rows.push(temp);
  }

  return (
    <>
      <Box mt={8}>
        <Navbar />
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setLocation("/student/library")}
                  >
                    <ArrowBackIcon /> &nbsp; Go Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={4} align="center">
                  <Typography component="h1" variant="h5">
                    {library_data && library_data.library_name}
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
                  {/* we have to add a condition that if the user is already connected then don't show this button */}
                  {connected ? (
                    <Button variant="contained" disabled color="success">
                      Connected
                    </Button>
                  ) : pendingRequest ? (
                    "Pending"
                  ) : (
                    <Button variant="contained" color="primary">
                      Send Request &nbsp;
                      <IosShareIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Grid container mt={10} className={classes.libPageHeading}>
                <Grid item xs={12} sm={12} md={6} align="center">
                  <Typography component="h1" variant="h5">
                    Maximum Lending Period:{" "}
                    {library_data && library_data.lending_period}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} align="center">
                  <Typography component="h1" variant="h5">
                    Connected Students:{" "}
                    {library_data && library_data.accepted_student.length}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid conatiner md={9} className={classes.libPageTable}>
                <Grid item xs={12} sm={12} md={12}>
                  <DashboardTable rows={rows} columns={columns} />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

LibPage.propTypes = {
  userRegister: PropTypes.object.isRequired,
  libraryStudentRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
  libraryStudentRegister: state.libraryStudentRegister,
});

export default connect(mapStateToProps)(LibPage);
