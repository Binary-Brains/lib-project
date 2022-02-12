import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ConnLib() {
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
          NIT Patna
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Issued Books: 30
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available Books: 300
        </Typography>
      </CardContent>
    </Card>
  );
}
