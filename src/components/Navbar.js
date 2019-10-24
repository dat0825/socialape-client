import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Material UI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import MyButton from "../util/MyButton";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <MyButton tooltip="Post a Status!">
                <AddIcon />
              </MyButton>
              <Link tp="/">
                <MyButton tooltip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tooltip="Notifications">
                <AddIcon />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign up
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired //biến authenticated ở đầu là biến được khai báo ở trên const authenticated = this.props
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
