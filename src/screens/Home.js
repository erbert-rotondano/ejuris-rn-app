import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Home extends Component {
  render(){
    return(
        <View>
        <TouchableOpacity onPress={ () => this.props.navigation.navigate('TestScreen') }>
        	<Text>Teste, olar</Text>
        </TouchableOpacity>
       	</View>
    );
  }
}

export default Home;	