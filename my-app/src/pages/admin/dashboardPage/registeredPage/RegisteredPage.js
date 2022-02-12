import * as React from "react";
import Box from "@mui/material/Box";
import DashCard from "../../../../components/student/DashCard";
import AdminNavbar from "../../../../components/admin/AdminNavbar";
import DashboardTable from "../../../../components/student/Table";
import { Button } from "@mui/material";

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

const columns = [
  {
    field: "student_name",
    headerName: "Student Name",
    width: 800,
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
          // onClick={(event) => {
          //   handleClick(event, cellValues);
          // }}
        >
          View Details
        </Button>
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

export default function RegisteredPage() {
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
