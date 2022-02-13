import React from "react";
import bookHome from "../../../assests/bookhome.jpg";
import "./VideoComp.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Grid, Link } from "@mui/material";

function VideoComp() {
  return (
    <>
      <section className="VdoCompShowcase">
        <img src={bookHome} alt="HomePageImg" />
        <div className="VdoCompOverlay"></div>
        <div className="VdoCompText">
          <h2>
            Welcome to
            <br /> Library Desk
          </h2>

          <p>A library is a hospital for the mind.</p>
          <Grid container>
            <Link
              href="https://github.com/Binary-Brains/lib-project"
              target="_blank"
              className="homePageLink"
              sx={{ textDecoration: "none", color: "#000" }}
            >
              <GitHubIcon />
              &nbsp; Github
            </Link>
          </Grid>
        </div>
      </section>
    </>
  );
}

export default VideoComp;
