import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Status from "../components/Status";

class home extends Component {
  state = {
    status: null
  };
  componentDidMount() {
    axios
      .get("/status")  // get proxy from package.json
      .then(res => {
        // console.log(res.data);
        this.setState({
          status: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentStatusMarkup = this.state.status ? (
      this.state.status.map(status => <Status key={status.statusId} status={status} />)
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
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
