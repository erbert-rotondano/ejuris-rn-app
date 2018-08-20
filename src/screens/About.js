import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import {Text} from 'react-native';
import axios from 'axios';
import Logo from '../components/login/Logo';
import {API_URL, DEVICE_WIDTH} from '../config/constants';

class About extends Component {
  constructor(props){
    super(props)
	    this.state = {
	      about:{}
	    }
	  }
	componentWillMount(){
		axios.get(`${API_URL}info_extra`)
		.then(response => {
			this.setState({about: response.data.about});
			console.log(this.state.about);
		}).catch(error => {
			console.log(error);
		})		
	}
  render(){
    return(
    	<ScrollView>
	        <View style={styles.generalContainer}>
	        	<View style={styles.firstSection}>
	        		<Text>{this.state.about.content}</Text>
	        	</View>
	        	<Logo />
	       	</View>
       	</ScrollView>
    );
  }
}

const styles = {
	generalContainer: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: '#FFFFFF'
	},
	firstSection:{
		marginTop: 20,
		marginBottom: 20
	},
	textContainer:{
		alignItems: 'center',
		marginBottom: 30
	},
	titleText:{
		fontSize: 18,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	button: {
		width: 170
	},
	secondSection:{
		marginTop: 30,
		flex: 1,
		flexDirection: 'column'
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
	    width: DEVICE_WIDTH - 125,
	    height: 40,
	    paddingLeft: 10,
	    marginHorizontal: 20,
	    borderRadius: 3,
	    borderWidth: 1,
	    borderColor: '#DDDDDD',
	    color: '#555555',
	    marginTop: 15
  	},
}



export default About;