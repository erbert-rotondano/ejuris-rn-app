import React, { Component } from 'react';
import { View } from 'react-native';
import {Text} from 'react-native';
import axios from 'axios';
import {API_URL, DEVICE_WIDTH} from '../config/constants';

class Contact extends Component {
	constructor(props){
    super(props)
	    this.state = {
	      contact:{}
	    }
	  }
	componentWillMount(){
		axios.get(`${API_URL}info_extra`)
		.then(response => {
			this.setState({contact: response.data.contact});
			console.log(this.state.contact);
		}).catch(error => {
			console.log(error);
		})		
	}
  render(){
    return(
        <View style={styles.generalContainer}>
        	<View style={styles.firstSection}>
        		<Text>{this.state.contact.content}</Text>
        	</View>
        	<View style={styles.secondSection}>
        		{this.renderPhones()}
        		<Text>Email: {this.state.contact.email}</Text>
        	</View>
       	</View>
    );
  }
  renderPhones(){
  	if (this.state.contact.phones){
  		return (<Text>Telefone(s): {this.state.contact.phones.map(i => i.number + ' | ') || '0000-0000'}</Text>);
  	}
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
		marginTop: 30
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

export default Contact;