import React from "react";
import { Redirect, Route } from "wouter";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddLibrary from "../pages/admin/addLibrary/AddLibrary";
import setAuthToken from "../utils/setAuthToken";
import Cookies from "js-cookie";

const AdminRoute = ({
  component: Component,
  path,
  adminRegister: { isAuthenticated, loading, token, adminInfo },
}) => {
  setAuthToken(Cookies.get("cs_at") || token);
  return (
    <Route exact path={path}>
      {(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/admin/signin" />
        ) : adminInfo.library_id ? (
          <Component {...props} />
        ) : (
          <AddLibrary />
        )
      }
    </Route>
  );
};

AdminRoute.propTypes = {
  adminRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
});

export default connect(mapStateToProps)(AdminRoute);
