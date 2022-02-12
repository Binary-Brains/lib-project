import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CountUp from "react-countup";
import Link from "@material-ui/core/Link";
import { useLocation } from "wouter";

const useStyles = makeStyles(() => ({
  cardzCont: {
    display: "flex",
    // ["@media (max-width:780px)"]: {
    //   flexDirection: "column",
    // },
  },
  individualCard: {
    backgroundColor: "#E5E4E2",
    boxShadow: "-3px 6px 5px 0px rgba(176,164,176,1)",
    transition: "all .3s ease-in-out",
    "&:hover": {
      boxShadow: "-3px 18px 20px 0px rgba(99,89,99,1)",
    },
  },
  secondCard: {
    marginLeft: "15px",
    marginRight: "15px",
    // ["@media (max-width:780px)"]: {
    //   marginTop: "25px",
    //   marginLeft: "0px",
    //   marginRight: "0px",
    // },
  },
  linkDashCards: {
    "&:hover": {
      textDecoration: "none",
    },
  },
}));


export default function DashCard({ data }) {
  const classes = useStyles();
  const [location, setLocation] = useLocation();
  console.log(location)
  return (
    <Grid conatiner className={classes.cardzCont}>
      {data.map((item) => {
        return (
          <Grid item xs={12} sm={12} md={4} className={classes.secondCard}>
            <Card variant="outlined" className={classes.individualCard}>
              <CardContent>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={item.num}
                    duration={1.5}
                    separator=","
                  ></CountUp>
                </Typography>
                <Link
                  onClick={() => setLocation(item.link)}
                  style={{ cursor: "pointer" }}
                  className={classes.linkDashCards}
                >
                  <Typography
                    sx={{ fontSize: 17, mt: 1.5, mb: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.desc}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
