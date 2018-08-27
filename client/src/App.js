import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import './App.css';
import { context as AuthContext, initialState } from './context/userContext';
import Index from './routes/index'
import { localStorage as storage } from './utils/storage';

class App extends Component {
  state = {
    username: initialState.username,
    token: initialState.token,
    isAuthenticated: initialState.isAuthenticated,
    isAuthenticating: initialState.isAuthenticating
  }

  loginPending = () => {
    this.setState({
      isAuthenticating: true
    });
  }

  loginSuccess = (username, token) => {
    storage.saveMulti({
      token, 
      username,
      isAuthenticated: true,
    });
    this.setState({
      username, token, isAuthenticated: true,
      isAuthenticating: false
    });
  }

  loginFailed = () => {
    storage.clear('token');
    this.setState({
      token: '',
      isAuthenticating: false
    });
  }

  logout = () => {
    storage.clearMulti(['username', 'token', 'isAuthenticated'])
    this.setState({
      token: '',
      username: '',
      isAuthenticated: false
    })
  }

  render() {
    return (
      <AuthContext.Provider value={{
        username: this.state.username,
        token: this.state.token,
        isAuthenticated: this.state.isAuthenticated,
        isAuthenticating: this.state.isAuthenticating,
        loginPending: this.loginPending,
        loginFailed: this.loginFailed,
        loginSuccess: this.loginSuccess,
        logout: this.logout
      }}>
        <Router>
          <Route exact path="/" component={Index} />
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
