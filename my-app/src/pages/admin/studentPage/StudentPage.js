import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import DashCard from "../../../components/student/DashCard";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import DashboardTable from "../../../components/student/Table";
import { Button, Grid, Typography } from "@mui/material";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import AssignNewBook from "./assignNewBook/AssignNewBook";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import PropTypes from "prop-types";
import {
  getStudentDashboardDetails,
  returnBook,
} from "../../../actions/admin/library";
import moment from "moment";
import CircularIndeterminate from "../../../components/Loader";

const useStyles = makeStyles(() => ({
  individualCard: {
    boxShadow: "-3px 6px 5px 0px rgba(176,164,176,1)",
    transition: "all .3s ease-in-out",
    "&:hover": {
      boxShadow: "-3px 18px 20px 0px rgba(99,89,99,1)",
    },
  },
  linkDashCards: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  adminDashTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "underline",
  },
}));
const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const finePageRows = [];

function StudentPage({
  id,
  adminRegister,
  libraryRegister: { libraryInfo, studentInfo, loading },
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentDashboardDetails(id));
  }, [dispatch, id]);

  //return function
  const handleClickReturn = async (e, cellValues) => {
    const res = window.confirm("Are you sure?");
    if (res) dispatch(returnBook(cellValues.row.history_id));
    dispatch(getStudentDashboardDetails(id));
  };

  const { issued_books, reserved_books, student_data } = studentInfo;

  const rows = [];

  const studentDashCards = [
    {
      desc: "Issued Books",
      num: issued_books && issued_books.length,
      link: "/admin/dashboard/student",
    },
    {
      desc: "Fine",
      num: 30,
      link: "/admin/dashboard/student/fine",
    },
    {
      desc: "Assign New book",
      num: reserved_books && reserved_books.length,
      link: "/admin/dashboard/student/assignbook",
    },
  ];

  const columns = [
    {
      field: "book_name",
      headerName: "Book Name",
      width: 800,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={(event) => {
              handleClickReturn(event, cellValues);
            }}
          >
            Return
          </Button>
        );
      },
    },
  ];

  const finePageColumns = [
    {
      field: "book_name",
      headerName: "Book Name",
      width: 800,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fine",
      headerName: "Fine",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
            Paid
          </Button>
        );
      },
    },
  ];

  //filling the issued books table
  issued_books &&
    issued_books.map(({ book_data, _id, issued_at }, index) => {
      var due_date = moment(issued_at).add(libraryInfo && libraryInfo.lending_period, 'days').format("DD-MM-YYYY");
      let temp = {
        id: index + 1,
        due_date,
        book_name: book_data && book_data[0].book_name,
        history_id: _id,
      };
      rows.push(temp);
      return 0;
    });

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      {!loading ? (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
          <Grid item mb={2}>
            <Typography component="h1" variant="h5" align="center">
              <b>{`${student_data && student_data.student_name}'s`}</b> Profile
            </Typography>
          </Grid>

          {/* <DashCard data={studentDashCards} /> */}
          <TabsUnstyled defaultValue={0}>
            <TabsList
              sx={{
                backgroundColor: "inherit",
                // eslint-disable-next-line
                ["@media (max-width:800px)"]: {
                  flexDirection: "column",
                },
              }}
            >
              {studentDashCards.map((item) => {
                return (
                  <Tab
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ffffff",
                      },
                    }}
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <Card
                        variant="outlined"
                        sx={{ backgroundColor: "#E5E4E2" }}
                        className={classes.individualCard}
                      >
                        <CardContent>
                          <Typography variant="h3">
                            <CountUp
                              start={0}
                              end={item.num}
                              duration={1.5}
                              separator=","
                            ></CountUp>
                          </Typography>
                          <Typography
                            sx={{ fontSize: 17, mt: 1.5, mb: 0 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {item.desc}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Tab>
                );
              })}
            </TabsList>
            <TabPanel value={0}>
              <DashboardTable rows={rows} columns={columns} />
            </TabPanel>
            <TabPanel value={1}>
              <DashboardTable rows={finePageRows} columns={finePageColumns} />
            </TabPanel>
            <TabPanel value={2}>
              <AssignNewBook reservedBooks={reserved_books} />
            </TabPanel>
          </TabsUnstyled>
        </Box>
      ) : (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
          {" "}
          <CircularIndeterminate />
        </Box>
      )}
    </Box>
  );
}

StudentPage.propTypes = {
  adminRegister: PropTypes.object.isRequired,
  libraryRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
  libraryRegister: state.libraryRegister,
});

export default connect(mapStateToProps)(StudentPage);
