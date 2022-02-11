import * as React from "react";
import Box from "@mui/material/Box";
import DashCard from "../../../components/student/DashCard";
import DashboardTable from "../../../components/student/Table";
import Navbar from "../../../components/student/Navbar";

export default function MiniDrawerDash() {
  // const data = [
  //   {
  //     name: "abc",
  //     age: 20,
  //     gender: "male",
  //   },
  //   {
  //     name: "def",
  //     age: 25,
  //     gender: "male",
  //   },
  // ];

  const dashCards = [
    {
      desc: "Issued Books",
      num: "40",
    },
    {
      desc: "Pending Books",
      num: "32",
    },
    {
      desc: "Reserved Books",
      num: "45",
    },
  ];

  const issuedBooks = [
    { "Book Name": "HC VERMA", Library: "NIT Patna", "Due Date": "09-02-2022" },
    {
      "Book Name": "RD Sharma",
      Library: "NIT Raipur",
      "Due Date": "07-02-2022",
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }} mt={8}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DashCard data={dashCards} />
          <DashboardTable data={issuedBooks} />
        </Box>
      </Box>
    </>
  );
}
