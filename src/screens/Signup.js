import React, { Component } from 'react';
import { View } from 'react-native';
import LoginBackground from '../components/login/LoginBackground';
import Logo from '../components/login/Logo';
import SignupForm from '../components/login/SignupForm';
import LoginSection from '../components/login/LoginSection';

class Signup extends Component {
  render(){
    return(
        <SignupForm navigation = { this.props.navigation }/>
    );
  }
}

export default Signup;