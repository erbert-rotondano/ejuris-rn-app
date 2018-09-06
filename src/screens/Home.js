import React, { Component } from 'react';
import { View, ScrollView, TextInput, AsyncStorage, BackHandler, KeyboardAvoidingView } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR, user_data, DEVICE_WIDTH} from '../config/constants';
import {processFetch} from '../actions/process';
import { connect } from 'react-redux';
import {Navigation} from '../config/routes';

class Home extends Component {
	componentWillMount(){
		AsyncStorage.getItem('@password:key').then((pwd) => {
			console.log('senha: ', pwd)
		});
		AsyncStorage.getItem('@email:key').then((pwd) => {
			console.log('email: ', pwd)
		});
		
		// this._getCurrentRouteName();
	}
	
	componentDidMount(){
		// BackHandler.addEventListener('hardwareBackPress', this.handleEvent);
		const handler = () => {
			console.log('toggling');
			return true;
		}
		this.props.navigation.addListener('willFocus' , () => BackHandler.addEventListener('hardwareBackPress', handler));
		this.props.navigation.addListener('willBlur' , () => BackHandler.removeEventListener('hardwareBackPress', handler));
		
		// const prevGetStateForAction = Navigation.router.getStateForAction;

		// 	Navigation.router.getStateForAction = (action, state) => {
		// 	  // Do not allow to go back from Home
		// 	  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Home') {
		// 	    return null;
		// 	  }

		// 	  // Do not allow to go back to Login
		// 	  if (action.type === 'Navigation/BACK' && state) {
		// 	    const newRoutes = state.routes.filter(r => r.routeName !== 'Login');
		// 	    const newIndex = newRoutes.length - 1;
		// 	    return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
		// 	  }
		// 	  return prevGetStateForAction(action, state);
		// 	};
	}
	// const turnOnHardwareButton = (handler) => {
	// 	BackHandler.addEventListener('hardwareBackPress', handler);
	// };
	// const turnOffHardwareButton = (handler) => {
	// 	BackHandler.removeEventListener('hardwareBackPress', handler);
	// };
	// const handleOnEvent = () => {
	// 	return true;
	// };
	handleNavigate(route, params){
		// BackHandler.removeEventListener('hardwareBackPress', this.handleEvent);
		this.props.navigation.navigate(route, params);
	}
	
	_getCurrentRouteName() {

	    if (this.props.navigation.state.hasOwnProperty('index')) {
	        this._getCurrentRouteName(this.props.navigation.state.routes[this.props.navigation.state.index])
	    } else {
	        console.log("Current Route Name:", this.props.navigation.state.routeName)
	       	// can then save this to the state (I used redux)
	        // store.dispatch(setCurrentRouteName(this.props.navigation.state.routeName))
	        return this.props.navigation.state.routeName;
	    }

	}
  	render(){
    return(
    	<KeyboardAvoidingView behavior="position">
    		<View style={styles.firstSection}>
	    		<View style={styles.textContainer}>
	    			<Text style={styles.titleText}>Meus Atendimentos</Text>
	    		</View>
	    		<View style={styles.buttonsContainer}>
		    		  <Button style={styles.button}
						  raised
						  backgroundColor={APP_COLOR}
						  onPress={() => this.handleNavigate('ProcessList', {typeToFetch: 'pendente'})}
						  title='Em Aberto' />
					  <Button style={styles.button}
						  raised
						  backgroundColor={APP_COLOR}
						  onPress={() => this.handleNavigate('ProcessList', {typeToFetch: 'concluido'})}
						  title='Concluídos' />
				 </View>
			 </View>
			 <View style={styles.secondSection}>
			 	<FormLabel>Consultar Atendimentos:</FormLabel>
			 	<View style={styles.searchContainer}>
			 		<View style={{flex: 2}}>
						<TextInput
				            style={styles.input}
		  					placeholder='Número de Protocolo/Processo: '
		  					autoCapitalize={'none'}
				            returnKeyType={'done'}
		  					autoCorrect={false}
				            placeholderTextColor='#AAAAAA'
				            underlineColorAndroid='transparent'
				            onChangeText={(value) => this.setState({searchterm: value})}/>
		            </View>
		            <View style={{height: 20, paddingTop: 13}}>
				        <Button style={{flex: 1}}
							  raised
							  backgroundColor={APP_COLOR}
							  onPress={() => this.handleNavigate('SearchResult', {searchterm: this.state.searchterm})}
							  title='Buscar' />
					</View>
			 	</View>
			 </View>
			 <View style={styles.thirdSection}>
	  			<Button
				  raised
				  backgroundColor={APP_COLOR}
				  onPress={() => this.handleNavigate('AddProcess')}
				  title='Novo Atendimento' />
			 </View>

    	</KeyboardAvoidingView>    	
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
const mapStateToProps = (state) => ({
  userprocess: state.userprocess,
});

export default connect(mapStateToProps, {processFetch})(Home);