import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Status from "../components/Status";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getStatus } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getStatus();
  }
  render() {
    const { status, loading } = this.props.data;
    let recentStatusMarkup = !loading ? (
      status.map(status => <Status key={status.statusId} status={status} />)
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {" "}
          {/* Tổng là 12 cột, sm={8} là chiếm 8 trong số 12 cột*/}
          {recentStatusMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getStatus: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getStatus }
)(home);
