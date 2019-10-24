import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MyButton from "../util/MyButton";

import { connect } from "react-redux";
import { likeAStatus, unlikeAStatus } from "../redux/actions/dataActions";

class Status extends Component {
  likedAStatus = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.statusId === this.props.status.statusId
      )
    ) {
      return true;
    } else return false;
  };
  likeAStatus = () => {
    this.props.likeAStatus(this.props.status.statusId);
  };
  unlikeAStatus = () => {
    this.props.unlikeAStatus(this.props.status.statusId);
  };
  render() {
    //set as: 'two days a go', 'an hour ago',....
    dayjs.extend(relativeTime);
    const {
      classes,
      status: {
        body,
        createdAt,
        userImage,
        userHandle,
        statusId,
        likeCount,
        CommentCount
      },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tooltip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedAStatus() ? (
      <MyButton tooltip="Undo like" onClick={this.unlikeAStatus}>
        <Favorite color="primary" />
      </MyButton>
    ) : (
      <MyButton tooltip="Like" onClick={this.likeAStatus}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tooltip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{CommentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

Status.propTypes = {
  likeAStatus: PropTypes.func.isRequired,
  unlikeAStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});
const mapActionsToProps = {
  likeAStatus,
  unlikeAStatus
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Status));
