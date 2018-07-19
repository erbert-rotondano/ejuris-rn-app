import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {TextInput} from 'react-native';

class UserDetail extends Component {
  render(){
    return(
    	<ScrollView style={{flex: 1}}>
	        <View style={styles.generalContainer}>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text> Essa é alguma informação do usuário </Text>
	        	</View>
	       	</View>

       	</ScrollView>
    );
  }
}

const styles = {
	generalContainer: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20,
		paddingTop: 20
	},
	firstSection:{
		marginTop: 30
	},
	textContainer:{
		alignItems: 'center',
		marginBottom: 30
	},
	subtitle:{
		fontSize: 13,
		marginBottom: 15
	},
	titleText:{
		fontSize: 18,
		marginBottom: 15
	},
	itemLabel:{
		color: '#DDDDDD',
		fontSize: 10,
		paddingTop: 3,
	},
	row: {
		borderWidth: 1,
		borderColor: '#DDDDDD',
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		paddingLeft: 10
	},
	column: {
		flexDirection: 'column',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	button: {
		width: 170
	},
	secondSection:{
		marginTop: 15,
	},
	searchContainer:{
		flexDirection: 'row',
		flex: 1,
		marginTop: 25
	},
	thirdSection: {
		marginTop: 100
	},
	input: {
	    backgroundColor: 'rgba(255,255,255,0.4)',
	    width: 350,
	    height: 50,
	    borderRadius: 3,
	    borderWidth: 1,
	    borderColor: '#DDDDDD',
	    color: '#555555',
	    marginBottom: 15
  	},
}
export default UserDetail;