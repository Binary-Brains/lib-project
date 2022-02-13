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
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
// import DetailsIcon from '@mui/icons-material/Details';
import { useDispatch } from "react-redux";
import { StudentLoad } from "../../../actions/student/auth";
import Moment from "react-moment";

const useStyles = makeStyles(() => ({
  learnMoreBtn: {
    textDecoration: "none",
  },
}));

export default function AllLibCard({ data, studentData }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  const classes = useStyles();
  console.log(location);
  const { library_request } = studentData;

  let requestSent = false;
  console.log(library_request);
  library_request.forEach((lib) => {
    if (lib.library_id === data._id) {
      requestSent = true;
    }
  });

  console.log(requestSent);

  const onClickHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendRequest(data._id));
    dispatch(StudentLoad());
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt={`${data.library_name} Logo`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data && data.library_name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Contact: {data && data.library_contact}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Created On:{" "}
          <Moment format="DD-MMM-YYYY">{data && data.createdAt}</Moment>
        </Typography>
      </CardContent>
      <CardActions id="libButton">
        <Link className={classes.learnMoreBtn}>
          <Button
            size="small"
            onClick={() =>
              setLocation(`/student/library/learnmore/${data._id}`)
            }
          >
            Learn More
          </Button>
        </Link>

        {requestSent ? (
          <LibraryAddCheckIcon />
        ) : (
          <Button size="small" onClick={(e) => onClickHandler(e)}>
            Send Request
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
