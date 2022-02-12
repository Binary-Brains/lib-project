import * as React from "react";
import Box from "@mui/material/Box";
import DashboardTable from "../../../components/student/Table";
import Navbar from "../../../components/student/Navbar";

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
    field: "issued_date",
    headerName: "Issued Date",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "returned_date",
    headerName: "Returned Date",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
];

const rows = [
  {
    id: 1,
    book_name: "HC Verma",
    library_name: "NIT Patna",
    issued_date: "15-07-2021",
    returned_date: "30-10-2023",
  },
  {
    id: 2,
    book_name: "HC Verma",
    library_name: "NIT Patna",
    issued_date: "15-07-2022",
    returned_date: "30-10-2023",
  },
  {
    id: 3,
    book_name: "RD Sharma",
    library_name: "NIT Raipur",
    issued_date: "15-07-2022",
    returned_date: "30-10-2023",
  },
  {
    id: 4,
    book_name: "RD Sharma",
    library_name: "NIT Raipur",
    issued_date: "15-07-2022",
    returned_date: "30-10-2023",
  },
];

export default function FeedsDrawer() {
  return (
    <>
      <Box sx={{ display: "flex" }} mt={8}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DashboardTable rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
}
