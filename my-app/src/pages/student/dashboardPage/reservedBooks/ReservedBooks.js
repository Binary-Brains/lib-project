import React from "react";
import Navbar from "../../../../components/student/Navbar";
import Box from "@mui/material/Box";
import DashCard from "../../../../components/student/DashCard";
import DashboardTable from "../../../../components/student/Table";

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

const rows = [
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

export default function PendingBooks() {
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
