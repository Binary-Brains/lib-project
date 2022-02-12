import * as React from "react";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function TransitionAlert({ alerts }) {
  console.log(alerts);
  // const [open, setOpen] = React.useState(true);

  return (
    <>
      {alerts &&
        alerts.map((alert) => {
          return (
            <Alert
              variant="filled"
              severity={alert.alertType}
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {alert.msg}
            </Alert>
          );
        })}
    </>
  );
}

TransitionAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.error,
});

export default connect(mapStateToProps)(TransitionAlert);
