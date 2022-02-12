import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Moment from 'react-moment'
import { CardActions } from "@material-ui/core";
import { Button } from "@mui/material";
import { useLocation } from "wouter";

export default function ConnLib({data}) {
  const [location, setLocation] = useLocation()
  console.log(location)
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
          {data && data.library_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: {data && data.library_contact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created On: <Moment format="DD-MMM-YYYY">{data && data.createdAt}</Moment>
        </Typography>
      </CardContent>
      <CardActions id="libButton">
          <Button size="small" onClick={() => setLocation(`/student/library/learnmore/${data._id}`)}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
