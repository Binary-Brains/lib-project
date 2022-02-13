import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "../../../components/admin/AdminNavbar";
import AdminProfTab from "../../../components/admin/AdminProfTab";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "wouter";
import PropTypes from "prop-types";
import moment from "moment";
import { updateAdmin } from "../../../actions/admin/auth";

function AdminSettingDrawer({ adminRegister, libraryRegister }) {
  console.log(adminRegister);
  return (
    <Box sx={{ display: "flex" }} mt={8}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AdminProfTab
          adminRegister={adminRegister.adminInfo}
          libraryRegister={libraryRegister}
        />
      </Box>
    </Box>
  );
}

AdminSettingDrawer.propTypes = {
  adminRegister: PropTypes.object.isRequired,
  libraryRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
  libraryRegister: state.libraryRegister,
});

export default connect(mapStateToProps)(AdminSettingDrawer);
