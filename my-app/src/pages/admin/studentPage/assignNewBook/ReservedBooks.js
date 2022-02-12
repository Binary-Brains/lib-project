import React from "react";
import Button from "@material-ui/core/Button";
import DashboardTable from "../../../../components/student/Table";

const columns = [
  {
    field: "book_name",
    headerName: "Book Name",
    width: 800,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "reserved_date",
    headerName: "Reserved Date",
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
          Assign
        </Button>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    book_name: "Concepts of Physics",
    reserved_date: "15-07-2022",
  },
  {
    id: 2,
    book_name: "Concepts of Physics",
    reserved_date: "15-07-2022",
  },
  {
    id: 3,
    book_name: "Let Us C",
    reserved_date: "15-07-2022",
  },
  {
    id: 4,
    book_name: "Let Us C",
    reserved_date: "15-07-2022",
  },
];

export default function ReservedBooks() {
  return (
    <>
      <DashboardTable rows={rows} columns={columns} />
    </>
  );
}
