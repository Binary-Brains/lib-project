import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const UseStyles = makeStyles((theme) => ({
  hRow: {
    marginTop: "30px",
    width: "100%",
  },
  gIcon: {
    fontSize: "15px",
  },
}));

export default function GoogleAuth() {
  const classes = UseStyles();
  return (
    <>
      <hr className={classes.hRow} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <p>or</p>
        </Grid>
      </Grid>
      <Grid
        href="http://localhost:8080/api/student/cr_acc/google"
        container
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Link href="#" variant="body2">
            <GoogleIcon className={classes.gIcon} />
          </Link>
        </Grid>
        <Grid item>
          <Link variant="body2">
            <p className={classes.gIcon}>oogle</p>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
