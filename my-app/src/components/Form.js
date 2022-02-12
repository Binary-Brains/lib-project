import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  form: {
    width: "60%",
    margin: "auto",
  },

  fields: {
    marginTop: "20px",
  },
}));

export default function Form({ data }) {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid item xs={12}>
              {data.map((item) => {
                return (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    className={classes.fields}
                    id={item.id}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    value={item.value}
                  />
                );
              })}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
