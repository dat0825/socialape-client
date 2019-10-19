import React from 'react';
import {Route, Redirect } from 'react-router-dom'

const AuthRoute = ({component: Component, authenticated, ...rest}) => (  //authenticated là thuộc tính để check xem đã hết hạn phiên đăng nhập chưa ( hết hạn token)
    <Route
    {...rest}
    render={(props) => 
        authenticated === true ? <Redirect to="/"/>:<Component {...props}/>  // nếu chưa hết hạn thì cứ trả về home
    }
    />
);
export default AuthRoute;
