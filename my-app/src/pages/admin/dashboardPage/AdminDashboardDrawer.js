import * as React from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types'
import Box from "@mui/material/Box";
import DashCard from "../../../components/student/DashCard";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import DashboardTable from "../../../components/student/Table";
import { Button, Typography } from "@mui/material";
import Link from "@material-ui/core/Link";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { acceptRequest, loadLibrary } from "../../../actions/admin/library";


// const pendingReq = [
//   {
//     "Student Name": "Sample Das",
//     Accept: (
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: "#4bb543",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "#4bb543",
//           },
//         }}
//       >
//         Accept
//       </Button>
//     ),
//     Reject: (
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: "#fc100d",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "#fc100d",
//           },
//         }}
//       >
//         Reject
//       </Button>
//     ),
//     "View Profile": (
//       <Link href="/admin/dashboard/student">
//         {" "}
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "#4379F7",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#4379F7",
//               textDecoration: "none",
//             },
//           }}
//         >
//           View Profile
//         </Button>
//       </Link>
//     ),
//   },
//   {
//     "Student Name": "Hello Das",
//     Accept: (
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: "#4bb543",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "#4bb543",
//           },
//         }}
//       >
//         Accept
//       </Button>
//     ),
//     Reject: (
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: "#fc100d",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "#fc100d",
//           },
//         }}
//       >
//         Reject
//       </Button>
//     ),
//     "View Profile": (
//       <Link href="/admin/dashboard/student">
//         {" "}
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: "#4379F7",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#4379F7",
//               textDecoration: "none",
//             },
//           }}
//         >
//           View Profile
//         </Button>
//       </Link>
//     ),
//   },
// ];


function AdminDashboardDrawer({libraryRegister, adminRegister}) {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  //uupdate this to just add a field in the drawer
  const {libraryInfo} = libraryRegister;
  const {adminInfo} = adminRegister
  const {library_id} = adminInfo
  
  useEffect(()=> {
    dispatch(loadLibrary(library_id))
  }, [])

  const handleClick = async (e, cellValues) => {
    e.preventDefault();
    await dispatch(acceptRequest({student_id: cellValues.row._id, library_id, accept: e.target.value}))
    await dispatch(loadLibrary(library_id))
  }

  const adminDashCards = [
    {
      desc: "Pending Requests",
      num: libraryInfo && libraryInfo.pending_request && libraryInfo.pending_request.length,
      link: "/admin/dashboard",
    },
    {
      desc: "Registered Students",
      num: libraryInfo && libraryInfo.accepted_student && libraryInfo.accepted_student.length,
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
            <Button
              variant="contained"
              color="info"
            >
              View Profile
            </Button>
          </Link>
        );
      },
    },
  ];
  
  const rows = [];

  libraryInfo && libraryInfo.pending_students && libraryInfo.pending_students.map(({student_name, _id, student_email}, index) => {
    let temp = {id: index+1, _id, student_name, student_email}
    rows.push(temp)
  })

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
      <Typography variant="h3">Welcome <span>{libraryInfo && libraryInfo.library_name}</span></Typography><br></br>
        <DashCard data={adminDashCards} />
        <DashboardTable rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}

AdminDashboardDrawer.propTypes = {
  adminRegister: PropTypes.object.isRequired,
  libraryRegister: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
  libraryRegister: state.libraryRegister
});

export default connect(mapStateToProps)(AdminDashboardDrawer);
