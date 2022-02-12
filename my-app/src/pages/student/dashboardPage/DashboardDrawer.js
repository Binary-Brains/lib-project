import * as React from "react";
import Box from "@mui/material/Box";
import DashCard from "../../../components/student/DashCard";
import DashboardTable from "../../../components/student/Table";
import Navbar from "../../../components/student/Navbar";

export default function MiniDrawerDash() {
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

  return (
    <>
      <Box sx={{ display: "flex" }} mt={8}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DashCard data={dashCards} />
          <DashboardTable rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
}
