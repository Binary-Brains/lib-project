import * as React from "react";
import Box from "@mui/material/Box";
import DashCard from "../../../components/student/DashCard";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import DashboardTable from "../../../components/student/Table";
import { Button } from "@mui/material";
import Link from "@material-ui/core/Link";

const adminDashCards = [
  {
    desc: "Pending Requests",
    num: "40",
    link: "/admin/dashboard",
  },
  {
    desc: "Registered Students",
    num: "32",
    link: "/admin/dashboard/registeredstudents",
  },
  {
    desc: "Added Books",
    num: "45",
    link: "/admin/dashboard/addedbooks",
  },
];

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

const columns = [
  {
    field: "student_name",
    headerName: "Student Name",
    width: 800,
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
          // onClick={(event) => {
          //   handleClick(event, cellValues);
          // }}
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
          // onClick={(event) => {
          //   handleClick(event, cellValues);
          // }}
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
        <Link href="/admin/dashboard/student">
          <Button
            variant="contained"
            color="info"
            // onClick={(event) => {
            //   handleClick(event, cellValues);
            // }}
          >
            View Profile
          </Button>
        </Link>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    student_name: "Arnav Ranjan",
  },
  {
    id: 2,
    student_name: "Anuj Agrawal",
  },
  {
    id: 3,
    student_name: "Rishabh Mishra",
  },
  {
    id: 4,
    student_name: "Siddharth Dubey",
  },
];

export default function AdminDashboardDrawer() {
  // const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const changeThePage = (url) => {};

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  //uupdate this to just add a field in the drawer

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
        <DashCard data={adminDashCards} />
        <DashboardTable rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
