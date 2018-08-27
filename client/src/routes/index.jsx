import React, { Component } from "react";

import { context as AuthContext } from "../context/userContext";
import { checkHttpStatus, parseJSON } from '../utils';

class Index extends Component {
  state = {
    username: "",
    password: ""
  };

  handleLogin = () => {
    fetch("http://localhost:8888/api/login/", {
      method: "post",
      credentials: "omit",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      this.props.loginSuccess(response.username, response.token)
    })
    .catch(err => {
      console.error(err)
    })
  };

  render() {
    const BeforeLogin = (
      <div>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          placeholder="username"
          type="text"
        />
        <input
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="password"
          type="password"
        />
        <input onClick={this.handleLogin} type="button" value="login" />
      </div>
    );
    const AfterLogin = (
      <div>
        <p>token: {this.props.token}</p>
        <p>username: {this.props.username}</p>
      </div>
    );

    return (
      <React.Fragment>
        {this.props.isAuthenticated ? AfterLogin : BeforeLogin}
      </React.Fragment>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {({ ...context }) => <Index {...props} {...context} />}
  </AuthContext.Consumer>
);
