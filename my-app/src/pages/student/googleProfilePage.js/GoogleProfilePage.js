import React from "react";
// import PropTypes from "prop-types";
import SaveProfileComponent from "../../../components/student/SaveProfileComponent";
import { Box } from "@material-ui/core";
import Navbar from "../../../components/student/Navbar";
// import AvatarComp from "../../../components/student/AvatarComp";


const GoogleProfilePage = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} mt={8}>
        <SaveProfileComponent />
      </Box>
    </Box>
  );
};

GoogleProfilePage.propTypes = {};

export default GoogleProfilePage;
