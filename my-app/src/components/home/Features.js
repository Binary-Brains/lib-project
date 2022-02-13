import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import features from "../../assests/features.svg";
import { Grid } from "@mui/material";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  featureCont: {
    marginTop: "60px",
    display: "flex",
    alignItems: "center",
    marginBottom: "60px",
    ["@media (max-width:900px)"]: {
      flexDirection: "column",
    },
  },
  featureImg: {
    height: "300px",
    width: "100%",
    ["@media (max-width:900px)"]: {
      height: "280px",
      width: "100%",
    },
  },
  featureTitle: {
    marginLeft: "60px",
    marginRight: "60px",
    ["@media (max-width:900px)"]: {
      marginLeft: "30px",
      marginRight: "30px",
    },
  },
}));

const featuresData = [
  {
    title: "Catalog management:",
    desc: "to digitally keep track of what is available in the library. The books will be catalogued by title, subject, author and date of publishing",
  },
  {
    title: "Membership management:",
    desc: "to maintain a detailed database of the members. The system records the name, ID and password of each user. The system helps in ascertaining the track record of the member.",
  },
  {
    title: "Search function:",
    desc: "to enable both the librarian and the members to search the catalog of books in the library. The search functions can be filtered to the need of each user.",
  },
  {
    title: "Self management:",
    desc: "to check in and check out books by oneself. The library management system software of digital libraries allows the members to login, search, select, issue and return books by themselves.",
  },
  {
    title: "Fine Management",
    desc: "Keep track of all the fines that are pending for the books submitted lately to the library.",
  },
  {
    title: "Notifications",
    desc: "Get the alert before the due date of the book so that you didn’t miss the deadline and will be safe from the fine",
  },
];

export default function Features() {
  const classes = useStyles();
  return (
    <div id="features">
      <Grid container sx={{ marginTop: "25px" }}>
        <Grid item xs={12} sm={12} md={6}>
          <h1
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              textDecoration: "underline",
              ["@media (max-width:900px)"]: {
                marginLeft: "30px",
                marginRight: "30px",
              },
            }}
          >
            Features
          </h1>
        </Grid>
      </Grid>
      <Grid container className={classes.featureCont}>
        <Grid item xs={12} sm={12} md={6}>
          <img src={features} className={classes.featureImg} alt="Feature" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Carousel data={featuresData} />
        </Grid>
      </Grid>
    </div>
  );
}
