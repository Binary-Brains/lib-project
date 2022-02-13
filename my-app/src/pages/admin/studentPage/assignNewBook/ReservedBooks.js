import React from "react";
import Button from "@material-ui/core/Button";
import DashboardTable from "../../../../components/student/Table";
// import { reserveBook } from "../../../../actions/student/library";
import moment from "moment";
import {
  getStudentDashboardDetails,
  issueReserveBook,
} from "../../../../actions/admin/library";
import { useDispatch } from "react-redux";

export default function ReservedBooks({ reservedBooks }) {
  const dispatch = useDispatch();
  const handleClick = async (e, cellValues) => {
    console.log(cellValues.row);
    const detail = {
      history_id: cellValues.row._id,
      student_id: cellValues.row.student_id,
      book_id: cellValues.row.book_id,
    };
    const res = window.confirm("Are you sure?");
    if (res) await dispatch(issueReserveBook(detail));
    dispatch(getStudentDashboardDetails(cellValues.row.student_id));
  };

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
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Assign
          </Button>
        );
      },
    },
  ];

  const rows = [];

  //filled the reserve books details
  reservedBooks &&
    reservedBooks.map(
      (
        { book_data, book_id, library_id, student_id, _id, booked_at },
        index
      ) => {
        var reserved_date = moment(booked_at).format("DD-MM-YYYY");
        let temp = {
          id: index + 1,
          reserved_date,
          book_name: book_data && book_data[0].book_name,
          _id,
          book_id,
          library_id,
          student_id,
        };
        rows.push(temp);
        return 0;
      }
    );
  return (
    <>
      <DashboardTable rows={rows} columns={columns} />
    </>
  );
}
