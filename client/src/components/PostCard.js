import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Comment, FavoriteBorder } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">{body}</Typography>
          <Button component={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Button>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            <FavoriteBorder />
          </IconButton>
          <IconButton aria-label="next">
            <Comment />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
        title="Live from space album cover"
      />
    </Card>
  );
};

export default PostCard;
