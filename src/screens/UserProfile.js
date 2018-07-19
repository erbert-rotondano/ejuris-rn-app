import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage} from 'react-native';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {TextInput} from 'react-native';
import {getUserInfo} from '../actions/auth';
import { connect } from 'react-redux';
import Spinner from '../components/common/Spinner';

class UserProfile extends Component {
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
						<Text style={styles.itemLabel}>Email: </Text><Text>{this.props.email || 'Informação não encontrada'}</Text>
					</View>
			  		<View style={styles.row}>
						<Text style={styles.itemLabel}>Nome: </Text><Text>{this.props.username || 'Informação não encontrada'}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.itemLabel}>Telefone: </Text><Text>{this.props.phone || 'Informação não encontrada'}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.itemLabel}>Competência: </Text><Text>{this.props.competence || 'Informação não encontrada'}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.itemLabel}>Endereço: </Text><Text>{this.props.address || 'Informação não encontrada'}</Text>
					</View>
				</View>
	  		);
	  	}
  	}
  	
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