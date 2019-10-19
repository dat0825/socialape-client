import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
// componets
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/home" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated} //authenticated là thuộc tính để check xem đã hết hạn phiên đăng nhập chưa ( hết hạn token)
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    // check token hết hạn thì sẽ bị logout
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

export default App;
