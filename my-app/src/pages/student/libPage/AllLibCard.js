import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "wouter";
import { sendRequest } from "../../../actions/student/library";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DetailsIcon from '@mui/icons-material/Details';
import { useDispatch } from "react-redux";
import { StudentLoad } from "../../../actions/student/auth";

const useStyles = makeStyles(() => ({
  learnMoreBtn: {
    textDecoration: "none",
  },
}));

export default function AllLibCard({data, studentData}) {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation()
  const classes = useStyles();

  const {library_request} = studentData;

  let requestSent = false
  console.log(library_request)
  library_request.map((lib) => {
    if(lib.library_id == data._id) {
      requestSent = true
    }
  })

  console.log(requestSent)

  const onClickHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendRequest(data._id));
    dispatch(StudentLoad())
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={data.avatar}
        alt={`${data.library_name} Logo`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data && data.library_name}
        </Typography>
      </CardContent>
      <CardActions id="libButton">
        <Link
          className={classes.learnMoreBtn}
        >
          <Button size="small" onClick={() => setLocation("/student/library/learnmore")}>Learn More</Button>
        </Link>

        { requestSent ? <LibraryAddCheckIcon /> : <Button size="small" onClick={(e) => onClickHandler(e)}>Send Request</Button>}
      </CardActions>
    </Card>
  );
}

