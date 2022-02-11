import * as React from "react";
import Box from "@mui/material/Box";
import DashboardTable from "../../../components/student/Table";
import Navbar from "../../../components/student/Navbar";

const feedsTable = [
  {
    "Book Name": "HC VERMA",
    Library: "NIT Patna",
    "Issue Date": "09-02-2022",
    "Return Date": "09-08-2022",
  },
  {
    "Book Name": "RD Sharma",
    Library: "NIT Raipur",
    "Issue Date": "07-02-2022",
    "Return Date": "09-08-2022",
  },
];

export default function FeedsDrawer() {
  return (
    <>
      <Box sx={{ display: "flex" }} mt={8}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DashboardTable data={feedsTable} />
        </Box>
      </Box>
    </>
  );
}
