import React from "react";
import { Redirect, Route } from "wouter";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import Cookies from "js-cookie";

const StudentRoute = ({
  component: Component,
  path,
  userRegister: { isAuthenticated, loading, token },
  ...rest
}) => {
  setAuthToken(Cookies.get("li_at") || token);
  return (
    <Route exact path={path}>
      {(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/student/signin" />
        ) : (
          <Component {...props} />
        )
      }
    </Route>
  );
};

StudentRoute.propTypes = {
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(StudentRoute);
