import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR} from '../config/constants'

class Home extends Component {
	
  render(){
    return(
    	<View style={styles.generalContainer}>
    		<View style={styles.firstSection}>
	    		<View style={styles.textContainer}>
	    			<Text style={styles.titleText}>Meus Atendimentos</Text>
	    		</View>
	    		<View style={styles.buttonsContainer}>
		    		  <Button style={styles.button}
						  raised
						  backgroundColor={APP_COLOR}
						  title='Em Aberto' />
					  <Button style={styles.button}
						  raised
						  backgroundColor={APP_COLOR}
						  title='Concluídos' />
				 </View>
			 </View>
			 <View style={styles.secondSection}>
			 <FormLabel>Name</FormLabel>
				<FormInput onChangeText={(value) => console.log(value)}/>
				<FormValidationMessage>Error message</FormValidationMessage>
			 </View>
    	</View>    	
    );
  }
  
}
const styles = {
	generalContainer: {
		flex: 1
	},
	firstSection:{

	},
	textContainer:{
		alignItems: 'center',
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

	}
}
export default Home;	