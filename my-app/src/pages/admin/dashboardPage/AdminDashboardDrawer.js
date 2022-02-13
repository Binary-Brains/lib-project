import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
// import DashCard from "../../../components/student/DashCard";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import DashboardTable from "../../../components/student/Table";
import { Button, Typography } from "@mui/material";
import Link from "@material-ui/core/Link";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { acceptRequest, loadLibrary } from "../../../actions/admin/library";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
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
    ["@media (max-width:650px)"]: {
      flexDirection: "column",
    },
  },
  adminDashSubTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

function AdminDashboardDrawer({ libraryRegister, adminRegister }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  console.log(location);
  //uupdate this to just add a field in the drawer
  const { libraryInfo, books } = libraryRegister;
  const { adminInfo } = adminRegister;
  const { library_id } = adminInfo;

  useEffect(() => {
    dispatch(loadLibrary(library_id));
  }, [dispatch, library_id]);

  const handleClick = async (e, cellValues) => {
    e.preventDefault();
    await dispatch(
      acceptRequest({
        student_id: cellValues.row._id,
        library_id,
        accept: e.target.value,
      })
    );
    await dispatch(loadLibrary(library_id));
  };

  const handleClickPageChange = (e, cellValues) => {
    e.preventDefault();
    setLocation(`/admin/dashboard/student/${cellValues.row._id}`);
  };

  const adminDashCards = [
    {
      desc: "Pending Requests",
      num:
        libraryInfo &&
        libraryInfo.pending_request &&
        libraryInfo.pending_request.length,
      link: "/admin/dashboard",
    },
    {
      desc: "Registered Students",
      num:
        libraryInfo &&
        libraryInfo.accepted_student &&
        libraryInfo.accepted_student.length,
      link: "/admin/dashboard/registeredstudents",
    },
    {
      desc: "Added Books",
      num: libraryInfo && libraryInfo.books && libraryInfo.books.length,
      link: "/admin/dashboard/addedbooks",
    },
  ];

  const columns = [
    {
      field: "student_name",
      headerName: "Student Name",
      width: 400,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "student_email",
      headerName: "Student Email",
      width: 400,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "accept",
      headerName: "Accept",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="success"
            value={true}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Accept
          </Button>
        );
      },
    },
    {
      field: "reject",
      headerName: "Reject",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="error"
            value={false}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Reject
          </Button>
        );
      },
    },
    {
      field: "view_profile",
      headerName: "View Profile",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Link onClick={() => setLocation("/admin/dashboard/student")}>
            <Button variant="contained" color="info">
              View Profile
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = [];

  const addedBookColumns = [
    {
      field: "book_name",
      headerName: "Book Name",
      width: 800,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "book_stock_total",
      headerName: "Total Stock",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "book_stock",
      headerName: "Stock Available",
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
            Edit
          </Button>
        );
      },
    },
  ];

  const addedBookRows = [];

  const registeredPageColumn = [
    {
      field: "student_name",
      headerName: "Student Name",
      width: 400,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "student_email",
      headerName: "Student Email",
      width: 400,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "view_details",
      headerName: "View Details",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={(event) => {
              handleClickPageChange(event, cellValues);
            }}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  const registeredPageRow = [];

  //filling the pending students table
  libraryInfo &&
    libraryInfo.pending_students &&
    libraryInfo.pending_students.map(
      ({ student_name, _id, student_email }, index) => {
        let temp = { id: index + 1, _id, student_name, student_email };
        rows.push(temp);
        return 0;
      }
    );

  //filling the regsitered students table
  libraryInfo &&
    libraryInfo.registered_students &&
    libraryInfo.registered_students.map(
      ({ student_name, _id, student_email }, index) => {
        let temp = { id: index + 1, _id, student_name, student_email };
        registeredPageRow.push(temp);
        return 0;
      }
    );

  let stockCounter = {};
  let availableStockCounter = {};
  let reservedStockCounter = {};
  let issuedStockCounter = {};
  let i = 0;
  //showing the stocks availble in the library
  libraryInfo &&
    libraryInfo.books &&
    libraryInfo.books.map(({ book_name, book_status, _id }, index) => {
      if (book_status === 1)
        availableStockCounter[book_name] =
          (Number(availableStockCounter[book_name]) || 0) + 1;
      if (book_status === 2)
        issuedStockCounter[book_name] =
          (Number(issuedStockCounter[book_name]) || 0) + 1;
      if (book_status === 3)
        reservedStockCounter[book_name] =
          (Number(reservedStockCounter[book_name]) || 0) + 1;
      stockCounter[book_name] = (Number(stockCounter[book_name]) || 0) + 1;
      return 0;
    });

  for (const key in stockCounter) {
    let temp = {
      id: i++,
      book_name: key,
      book_stock: availableStockCounter[key],
      book_stock_total: stockCounter[key],
    };
    addedBookRows.push(temp);
  }
  console.log(Object.values(stockCounter));

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      {libraryRegister && libraryRegister.loading ? (
        <CircularIndeterminate />
      ) : (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
          <Typography variant="h3" className={classes.adminDashTitle}>
            Welcome&nbsp;<span>{libraryInfo && libraryInfo.library_name}</span>
          </Typography>
          <br></br>
          <Typography variant="h6" className={classes.adminDashSubTitle}>
            Issued:
            <span>
              {books && books.filter((b) => b.book_status === 2).length}
            </span>{" "}
            &nbsp; Reserved:
            <span>
              {books && books.filter((b) => b.book_status === 3).length}
            </span>{" "}
            &nbsp; Available:
            <span>
              {books && books.filter((b) => b.book_status === 1).length}
            </span>{" "}
          </Typography>
          <br></br>
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
              {adminDashCards.map((item) => {
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
                rows={registeredPageRow}
                columns={registeredPageColumn}
              />
            </TabPanel>
            <TabPanel value={2}>
              <DashboardTable rows={addedBookRows} columns={addedBookColumns} />
            </TabPanel>
          </TabsUnstyled>
        </Box>
      )}
    </Box>
  );
}

AdminDashboardDrawer.propTypes = {
  adminRegister: PropTypes.object.isRequired,
  libraryRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
  libraryRegister: state.libraryRegister,
});

export default connect(mapStateToProps)(AdminDashboardDrawer);
