import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage} from 'react-native';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {TextInput} from 'react-native';
import {getUserInfo} from '../actions/auth';
import { connect } from 'react-redux';
import Spinner from '../components/common/Spinner';

class UserProfile extends Component {
	state={
		newUsername: '', 
		newAddress: '', 
		newPhone: '', 
		newPassword: '', 
		newPasswordConfirmation: ''
	}
	componentWillMount(){
		this.loadUserInfo(); 
	}
	loadUserInfo = async () => {
		AsyncStorage.getItem('@email:key').then((email) => {
			AsyncStorage.getItem('@password:key').then((password) => {
				this.props.getUserInfo({email, password});
				console.log(email, password);			
			}).catch(error => {
				console.log(error);
			});
		}).catch(error => {
			console.log(error);
		});
	}
	
  render(){
    return(
    	<ScrollView style={{flex: 1}}>
	        <View style={styles.generalContainer}>
	        	{this.renderUserInfo()}
	       	</View>

       	</ScrollView>
    );
  }
  renderUserInfo(){
  	const { username, phone, competence, address } = this.props;
  	console.log(this.props.email)
  	if(this.props.loadingUserData){
  		return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner size="large" />
          </View>
        )
  	} else {
	  	if(this.props.loadedUserData){
	  		return(
		  		<View>
			  		<View style={styles.row}>
						<Text style={styles.itemLabel}>Email: </Text>
							<Text>{this.props.email || 'Informação não encontrada'}</Text>
					</View>
			  		<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.itemLabel}>Nome: </Text>
							<TextInput
					                style={styles.input}
					                placeholder={this.props.username || 'Informação não encontrada'}
					                autoCapitalize={'none'}
					                returnKeyType={'next'}
					                ref={(input) => this.username = input}
					                autoCorrect={false}
					                placeholderTextColor='#AAAAAA'
					                underlineColorAndroid='transparent'
					                onChangeText={(value) => this.setState({newUsername: value})}
					                onSubmitEditing={() => this.phone.focus()} />
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.itemLabel}>Telefone: </Text>
							<TextInput
					                style={styles.input}
					                placeholder={this.props.phone || 'Informação não encontrada'}
					                autoCapitalize={'none'}
					                returnKeyType={'next'}
					                ref={(input) => this.phone = input}
					                autoCorrect={false}
					                placeholderTextColor='#AAAAAA'
					                underlineColorAndroid='transparent'
					                onChangeText={(value) => this.setState({newPhone: value})}
					                onSubmitEditing={() => this.address.focus()} />
					    </View>
					</View>
					<View style={styles.row}>
						<Text style={styles.itemLabel}>Competência: </Text><Text>{this.props.competence || 'Informação não encontrada'}</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.itemLabel}>Endereço: </Text>
							<TextInput
					                style={styles.input}
					                placeholder={this.props.address || 'Informação não encontrada'}
					                autoCapitalize={'none'}
					                returnKeyType={'done'}
					                ref={(input) => this.address = input}
					                autoCorrect={false}
					                placeholderTextColor='#AAAAAA'
					                underlineColorAndroid='transparent'
					                onChangeText={(value) => this.setState({newAddress: value})}/>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.itemLabel}>Senha: </Text>
							<TextInput
					                style={styles.input}
					                placeholder={'Digite aqui a nova senha'}
					                autoCapitalize={'none'}
					                returnKeyType={'next'}
					                ref={(input) => this.password = input}
					                autoCorrect={false}
					                placeholderTextColor='#AAAAAA'
					                underlineColorAndroid='transparent'
					                onChangeText={(value) => this.setState({newPassword: value})}
					                onSubmitEditing={() => this.password_confirmation.focus()} />
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text style={styles.itemLabel}>Confirmação de Senha: </Text>
							<TextInput
					                style={styles.input}
					                placeholder={'Confirme a senha'}
					                autoCapitalize={'none'}
					                returnKeyType={'done'}
					                ref={(input) => this.password_confirmation = input}
					                autoCorrect={false}
					                placeholderTextColor='#AAAAAA'
					                underlineColorAndroid='transparent'
					                onChangeText={(value) => this.setState({newPasswordConfirmation: value})}/>
		                </View>
					</View>
					<View style={styles.secondSection}>
		        	<View style={styles.row}>
		        		<View style={styles.column}>
			        		<View style={{paddingTop: 15, paddingBottom: 15, flex: 1}}>
				        		<Button
				        		  style={{flex: 1}}
								  raised
								  backgroundColor={APP_COLOR}
								  onPress={() => this.checkAndSendInfo()}
								  title='Salvar Alterações' />	
							  </View>
		        		</View>
		        	</View>
	        	</View>
				</View>
	  		);
	  	}
  	}
  	
  }
  checkAndSendInfo(){
  	const {newUsername, newAddress, newPhone, newPassword, newPasswordConfirmation } = this.state;
  	console.log(newUsername, newAddress, newPhone, newPassword, newPasswordConfirmation );
  	// let error = false;
  	// let eName = false;
  	// let eAddress = false;
  	// let ePhone = false;
  	// let ePassword = false;
  	// if(newUsername != '' || newAddress != '' || newPhone != '' || newPassword != '' || newPasswordConfirmation != ''){
  	// 	// Algo foi alterado...
  		
  	// 	if(newPassword != '' && newPasswordConfirmation != ''){
  	// 		if(newPassword != newPasswordConfirmation){
  	// 			ePassword = true;
  	// 		}
  	// 	}

  	// 	if(newUsername == '' || newUsername == null){
  	// 		eName = true;
  	// 	}
  	// 	if(newAddress == '' || newAddress == null){
  	// 		eAddress = true;
  	// 	}
  	// 	if(newPhone == '' || newPhone == null){
  	// 		ePhone = true;
  	// 	}

  		// chama o método com os parametros certos
  		// if(eName !=)
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
		flex: 1
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
const mapStateToProps = (state) => ({
  loadingUserData: state.auth.loadingUserData,	
  loadedUserData: state.auth.loadedUserData,
  username: state.auth.username,
  phone: state.auth.phone,
  competence: state.auth.competence,
  address: state.auth.address,
  email: state.auth.email
});

export default connect(mapStateToProps, {getUserInfo})(UserProfile);