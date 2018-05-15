import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProcessDetail extends Component {
  render(){
    return(
        <View>
        	<Text>{this.props.navigation.state.params.item.title}</Text>
       	</View>
    );
  }
}

export default ProcessDetail;