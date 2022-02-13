import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Link, Typography } from "@mui/material";
import StudentTab from "../../../../components/admin/StudentTab";
import DashCard from "../../../../components/student/DashCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrimarySearchAppBar from "../../../../components/student/TopNavOnly";

const assignNewBookCards = [
  {
    desc: "Issued Books",
    num: 40,
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

export default function AssignNewBook({ reservedBooks }) {
  return (
    <>
      {/* <PrimarySearchAppBar /> */}
      <StudentTab reservedBooks={reservedBooks} />
    </>
  );
}
