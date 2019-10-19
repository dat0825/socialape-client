import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.jpg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.formLogin_Signup
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault(); // chặn sự kiện mặc định
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/login", userData) // get proxy from package.json
      .then(res => {
        console.log(res.data);
        localStorage.setItem(`FBIdToken`, `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push("/");  // chuyển về trang home khi login thành công
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value // event.target.name == email or password
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="hihihihi" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.TextField}
              fullWidth
              value={this.state.email}
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.TextField}
              fullWidth
              value={this.state.password}
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
            ></TextField>
            {errors.general && ( //check xem errors.general có null hay không
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading} // khi loading sẽ disable button đi
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account ? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
