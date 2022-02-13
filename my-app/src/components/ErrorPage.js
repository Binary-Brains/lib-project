import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  notfound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  errorH1: {
    color: "#000",
    fontWeight: "900",
    fontSize: "200px",
  },

  errorLink: {
    fontSize: "14px",
    textDecoration: "none",
    textTransform: "uppercase",
    background: "#1c8ef9",
    borderRadius: "25px",
    padding: "16px 38px",
    border: "2px solid transparent",
    color: "#fff",
    fontWeight: "400",
    marginTop: "0px",
    "&:hover": { textDecoration: "none" },
  },
}));

function ErrorPage() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.notfound}>
        <h1 className={classes.errorH1}>404</h1>

        <Link href="/" className={classes.errorLink}>
          Back to Homepage
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
