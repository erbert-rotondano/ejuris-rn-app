import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import logoImg from '../../images/logo.png';

export default class Logo extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 90,
  },
});
