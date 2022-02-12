import React from "react";
import { Redirect, Route } from "wouter";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AdminRoute = ({
  component: Component,
  path,
  adminRegister: { isAuthenticated, loading},
  ...rest
}) => (
    <Route exact path={path}>
        {(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/admin/signin" />
        ) : (
          <Component {...props} />
        )
      }
    </Route>
  );   

    

AdminRoute.propTypes = {
  adminRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  adminRegister: state.adminRegister,
});

export default connect(mapStateToProps)(AdminRoute);
