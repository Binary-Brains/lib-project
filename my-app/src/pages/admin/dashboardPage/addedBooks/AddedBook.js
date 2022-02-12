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
    field: "book_name",
    headerName: "Book Name",
    width: 800,
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

const rows = [
  {
    id: 1,
    book_name: "Concepts of Physics",
    book_stock: 550,
  },
  {
    id: 2,
    book_name: "Concepts of Physics",
    book_stock: 350,
  },
  {
    id: 3,
    book_name: "Let Us C",
    book_stock: 250,
  },
  {
    id: 4,
    book_name: "Let Us C",
    book_stock: 350,
  },
];

export default function AddedBook() {
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
