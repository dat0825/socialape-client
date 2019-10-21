import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = (
  { component: Component, authenticated, ...rest } //authenticated là thuộc tính để check xem đã hết hạn phiên đăng nhập chưa ( hết hạn token)
) => (
  <Route
    {...rest}
    render={
      props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} /> // nếu chưa hết hạn thì cứ trả về home
    }
  />
);

const mapStateToProps = state => ({
  authenticated: state.user.authenticated // lấy thuộc tính authenticated ở trong store.js
});

AuthRoute.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
