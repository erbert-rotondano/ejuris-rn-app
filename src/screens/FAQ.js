import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import axios from 'axios';
import {API_URL, DEVICE_WIDTH} from '../config/constants';
import {ListItem} from 'react-native-elements';

class FAQ extends Component {
  constructor(props){
    super(props)
	    this.state = {
	      faq:{},
	      loaded: false
	    }
	  }
	componentWillMount(){
		axios.get(`${API_URL}info_extra`)
		.then(response => {
			this.setState({faq: response.data.faq, loaded: true});
			
		}).catch(error => {
			console.log(error);
		});		
	}
  render(){
    return(
    	<ScrollView>
	        <View style={styles.generalContainer}>
	        	<View style={styles.firstSection}>
	        		<Text>{this.state.faq.content}</Text>
	        		{this.renderQuestions()}
	        	</View>
	        	<View>
	        		
	        	</View>
	       	</View>
	    </ScrollView>
    );
  }
  renderQuestions(){
  	if(this.state.loaded){
  		return this.state.faq.questions.map(q => this.renderItems(q.question, q.answer, q.id));
  	}
  	
  }
  renderItems(question, answer, id){
  	return (
  		<ListItem
	        key={id}
	        title={question}
	        subtitle={answer}
	        hideChevron
	      />
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
  	questions: {
  		fontWeigth: 'bold'
  	},
  	answers: {
  		fontSize: 11
  	}

}

export default FAQ;