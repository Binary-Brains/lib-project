import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "../../../components/student/Navbar";
import UnstyledTabsCustomized from "../../../components/student/TabsList";
import { connect, useDispatch } from "react-redux";
// import { useLocation } from 'wouter';
import PropTypes from "prop-types";
import {
  getConnectedLibraries,
  loadLibraries,
} from "../../../actions/student/library";
// import setAuthToken from "../../../utils/setAuthToken";

function LibraryDrawer({ libraryStudentRegister, userRegister }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadLibraries());
    dispatch(getConnectedLibraries());
  }, [dispatch, userRegister]);

  return (
    <Box sx={{ display: "flex" }} mt={8}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <UnstyledTabsCustomized
          data={libraryStudentRegister}
          studentData={userRegister.studentInfo}
        />
      </Box>
    </Box>
  );
}

LibraryDrawer.propTypes = {
  libraryStudentRegister: PropTypes.object.isRequired,
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  libraryStudentRegister: state.libraryStudentRegister,
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(LibraryDrawer);
