import * as React from "react";
import Box from "@mui/material/Box";
import DashCard from "../../../components/student/DashCard";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import DashboardTable from "../../../components/student/Table";
import { Button } from "@mui/material";

const fineCards = [
  {
    desc: "Issued Books",
    num: "40",
    link: "/admin/dashboard/student",
  },
  {
    desc: "Fine",
    num: 30,
    link: "/admin/dashboard/student/fine",
  },
  {
    desc: "Assign New book",
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

const rows = [
  {
    id: 1,
    book_name: "Concepts of Physics",
    fine: "₹35",
  },
  {
    id: 2,
    book_name: "Concepts of Physics",
    fine: "₹35",
  },
  {
    id: 3,
    book_name: "Let Us C",
    fine: "₹50",
  },
  {
    id: 4,
    book_name: "Let Us C",
    fine: "₹95",
  },
];

export default function FinePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={10}>
        {/* <Grid item mb={2}>
         <Typography component="h1" variant="h5" align="center">
            {title} Profile
          </Typography>
        </Grid> */}
        <DashCard data={fineCards} />
        <DashboardTable rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
