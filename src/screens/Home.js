import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR, user_data} from '../config/constants';
import {processFetch} from '../actions/process';
import { connect } from 'react-redux';

class Home extends Component {
	componentWillMount(){
		this.props.processFetch(user_data[0], user_data[1]);
	}
	
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
						  onPress={() => this.props.navigation.navigate('ProcessList', {typeToFetch: 'open'})}
						  title='Em Aberto' />
					  <Button style={styles.button}
						  raised
						  backgroundColor={APP_COLOR}
						  onPress={() => this.props.navigation.navigate('ProcessList', {typeToFetch: 'closed'})}
						  title='Concluídos' />
				 </View>
			 </View>
			 <View style={styles.secondSection}>
			 <FormLabel>Consultar Atendimentos:</FormLabel>
				<FormInput onChangeText={(value) => console.log(value)}/>
			 </View>
			 <View style={styles.thirdSection}>
			  <Button
						  raised
						  backgroundColor={APP_COLOR}
						  onPress={() => this.props.navigation.navigate('AddProcess')}
						  title='Novo Atendimento' />
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
		marginTop: 30
	},
	thirdSection: {
		marginTop: 30
	}
}
const mapStateToProps = (state) => ({
  process: state.process,
});

export default connect(mapStateToProps, {processFetch})(Home);