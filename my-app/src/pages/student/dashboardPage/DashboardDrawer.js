import * as React from "react";
import Box from "@mui/material/Box";
// import DashCard from "../../../components/student/DashCard";
import DashboardTable from "../../../components/student/Table";
import Navbar from "../../../components/student/Navbar";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  studentDashTitle: {
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

function MiniDrawerDash({ userRegister }) {
  const classes = useStyles();

  const dashCards = [
    {
      desc: "Issued Books",
      num: "40",
      link: "/student/dashboard",
    },
    {
      desc: "Pending Books",
      num: "32",
      link: "/student/dashboard/pendingbooks",
    },
    {
      desc: "Reserved Books",
      num: "45",
      link: "/student/dashboard/reservedbooks",
    },
  ];

  const columns = [
    {
      field: "book_name",
      headerName: "Book Name",
      width: 500,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "library_name",
      headerName: "Library Name",
      width: 500,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
  ];

  const rows = [
    {
      id: 1,
      book_name: "HC Verma",
      library_name: "NIT Patna",
      due_date: "15-07-2021",
    },
    {
      id: 2,
      book_name: "HC Verma",
      library_name: "NIT Patna",
      due_date: "15-07-2022",
    },
    {
      id: 3,
      book_name: "RD Sharma",
      library_name: "NIT Raipur",
      due_date: "15-07-2022",
    },
    {
      id: 4,
      book_name: "RD Sharma",
      library_name: "NIT Raipur",
      due_date: "15-07-2022",
    },
  ];

  const pendingBooksColumn = [
    {
      field: "book_name",
      headerName: "Book Name",
      width: 700,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 500,
      headerClassName: "super-app-theme--header",
    },
  ];

  const pendingBooksRow = [
    {
      id: 1,
      book_name: "HC Verma",
      due_date: "15-07-2021",
    },
    {
      id: 2,
      book_name: "HC Verma",
      due_date: "15-07-2022",
    },
    {
      id: 3,
      book_name: "RD Sharma",
      due_date: "15-07-2022",
    },
    {
      id: 4,
      book_name: "RD Sharma",
      due_date: "15-07-2022",
    },
  ];

  const reserveBooksColumn = [
    {
      field: "book_name",
      headerName: "Book Name",
      width: 700,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "reserve_date",
      headerName: "Reserve Date",
      width: 500,
      headerClassName: "super-app-theme--header",
    },
  ];

  const reserveBooksRow = [
    {
      id: 1,
      book_name: "HC Verma",
      reserve_date: "15-07-2021",
    },
    {
      id: 2,
      book_name: "HC Verma",
      reserve_date: "15-07-2022",
    },
    {
      id: 3,
      book_name: "RD Sharma",
      reserve_date: "15-07-2022",
    },
    {
      id: 4,
      book_name: "RD Sharma",
      reserve_date: "15-07-2022",
    },
  ];

  const { studentInfo } = userRegister;

  return (
    <>
      <Box sx={{ display: "flex" }} mt={8}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h3" className={classes.studentDashTitle}>
            Welcome&nbsp;<span>{studentInfo && studentInfo.student_name}</span>
          </Typography>
          <br></br>

          {/* <DashCard data={dashCards} /> */}
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
              {dashCards.map((item) => {
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
              <DashboardTable
                rows={pendingBooksRow}
                columns={pendingBooksColumn}
              />
            </TabPanel>
            <TabPanel value={2}>
              <DashboardTable
                rows={reserveBooksRow}
                columns={reserveBooksColumn}
              />
            </TabPanel>
          </TabsUnstyled>
        </Box>
      </Box>
    </>
  );
}

MiniDrawerDash.propTypes = {
  userRegister: PropTypes.object.isRequired,
  libraryStudentRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
  libraryStudentRegister: state.libraryStudentRegister,
});

export default connect(mapStateToProps)(MiniDrawerDash);
