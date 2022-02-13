import * as React from "react";
import Box from "@mui/material/Box";
import DashboardTable from "../../../components/student/Table";
import Navbar from "../../../components/student/Navbar";
import { loadFeed } from "../../../actions/student/library";
import { connect, useDispatch } from "react-redux";
// import { useLocation } from "wouter";
import PropTypes from "prop-types";
import moment from "moment";
import CircularIndeterminate from "../../../components/Loader";

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

function FeedsDrawer({ libraryStudentRegister }) {
  console.log(libraryStudentRegister);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadFeed());
  }, [dispatch]);

  const rows = [];

  console.log(
    libraryStudentRegister &&
      libraryStudentRegister.feeds &&
      libraryStudentRegister.feeds.returned_books
  );

  //fill the feeds table according to the data
  libraryStudentRegister &&
    libraryStudentRegister.feeds &&
    libraryStudentRegister.feeds.returned_books &&
    libraryStudentRegister.feeds.returned_books.map(
      (
        { book_data, library_id, library_data, issued_at, returned_at },
        index
      ) => {
        const issued_date = moment(issued_at).format("DD-MM-YYYY");
        const returned_date = moment(returned_at).format("DD-MM-YYYY");
        let temp = {
          id: index + 1,
          book_name: book_data[0].book_name,
          library_name:
            library_data && library_data[0] && library_data[0].library_name,
          issued_date,
          returned_date,
        };
        rows.push(temp);
        return 0;
      }
    );
  return (
    <>
      <Box sx={{ display: "flex" }} mt={8}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {libraryStudentRegister && libraryStudentRegister.loading ? <CircularIndeterminate /> :<DashboardTable rows={rows} columns={columns} />}
        </Box>
      </Box>
    </>
  );
}

FeedsDrawer.propTypes = {
  userRegister: PropTypes.object.isRequired,
  libraryStudentRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
  libraryStudentRegister: state.libraryStudentRegister,
});

export default connect(mapStateToProps)(FeedsDrawer);
