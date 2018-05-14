import React, { Component, PropTypes } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import login_bg from '../../images/login_bg.png';

export default class LoginBackground extends Component {
  render() {
    return(
      <ImageBackground style={ styles.picture } source={login_bg} >
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
  },
});
