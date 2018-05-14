import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

import LoginBackground from './LoginBackground';
import Logo from './Logo';
import LoginForm from './LoginForm';
import SignupSection from './SignupSection';

export default class LoginScreen extends Component {
  render(){
    return(
      <LoginBackground>
        <StatusBar barStyle="light-content"/>
        <Logo/>
        <LoginForm/>
        <SignupSection/>
      </LoginBackground>
    );
  }
}
