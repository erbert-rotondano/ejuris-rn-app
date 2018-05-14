import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class LoginSection extends Component {
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={ () => this.props.navigation.goBack()}
        >
          <Text style={styles.text}>Já possuo uma conta.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  }
});
