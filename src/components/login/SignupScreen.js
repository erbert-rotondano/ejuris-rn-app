import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Image
} from 'react-native';

import LoginBackground from './LoginBackground';
import Logo from './Logo';
import SignupForm from './SignupForm';
import LoginSection from './LoginSection';

export default class SignupScreen extends Component {
  render(){
    return(
      <LoginBackground>
        <Logo/>
        <SignupForm/>
        <LoginSection/>
      </LoginBackground>
    );
  }
}
