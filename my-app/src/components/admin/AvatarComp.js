import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function AvatarComp({ heading }) {
  const classes = useStyles();

  return (
    <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
  );
}
