import React from "react";
import { Redirect, Route } from "wouter";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StudentRoute = ({
  component: Component,
  path,
  userRegister: { isAuthenticated, loading},
  ...rest
}) => (
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

    

StudentRoute.propTypes = {
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(StudentRoute);
