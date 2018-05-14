import React, { Component } from 'react';
import { View } from 'react-native';
import LoginBackground from '../components/login/LoginBackground';
import Logo from '../components/login/Logo';
import LoginForm from '../components/login/LoginForm';
import SignupSection from '../components/login/SignupSection';

class Login extends Component {
  render(){
    return(
        <LoginBackground>
        <Logo/>
        <LoginForm navigation = { this.props.navigation }/>
        <SignupSection navigation = { this.props.navigation } />
      </LoginBackground>
    );
  }
}

export default Login;