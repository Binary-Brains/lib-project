import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  learnMoreBtn: {
    textDecoration: "none",
  },
}));

export default function AllLibCard() {
  const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          NIT Jamshedpur
        </Typography>
      </CardContent>
      <CardActions id="libButton">
        <Link
          href="/student/library/learnmore"
          className={classes.learnMoreBtn}
        >
          <Button size="small">Learn More</Button>
        </Link>

        <Button size="small">Send Request</Button>
      </CardActions>
    </Card>
  );
}
