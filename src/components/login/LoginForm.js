import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ButtonSubmit } from './ButtonSubmit';
import { Spinner } from './Spinner';
import apiUtils from '../../config/apiUtils';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, userLogin } from '../../actions/auth';

class LoginForm extends Component {
  _navigateTo = (routeName: string) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  emailChanged(value) {
    // const email = _.lowerCase(value.trim());
    // lowDash needed
    const email = value.trim();
    this.props.emailChanged(email);
  }
  
  passwordChanged(value) {
    this.props.passwordChanged(value.trim());
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.userLogin({ email, password });
  }

  renderError() {
    if (this.props.error) {
      if (this.props.error_message) {
        return (
          <Text
            style={{
            textAlign: 'center',
            fontSize: 14,
            color: '#cc3333',
            marginBottom: 15,
          }}
          >{this.props.error_message}</Text>
        );
      }
    }
    if(this.props.isAuthenticated){
      this.props.navigation.navigate('Home');
    }
    return null;
  }

  renderButton() {
    if (this.props.isFetching) {
      return <Spinner size="small" />;
    }

    return (
      <ButtonSubmit onPress={this.onButtonPress.bind(this)}>
        Conectar-se
      </ButtonSubmit>
    );
  }

  disabledInputStyle() {
    if (this.props.isFetching) {
      return {
        backgroundColor: '#EEE',
      }
    }
  }

  componentWillMount() {
    // this._loadAuthentication_token().done();
  }

  componentDidUpdate(prevProps, prevState) {
    // this._setAuthentication_token().done(); 
  }

  _loadAuthentication_token = async () => {
    try {
      var value = await AsyncStorage.getItem('@authentication_token:key');
      if (value !== null){
        // We have data!!
        // console.log('We have data');
        console.log(value);
        // this.props.navigation.navigate('drawerStack');
        this._navigateTo('drawerStack')
      }
    } catch (error) {
      // Error retrieving data
      // console.log('Error retrieving data');
    }
  }

  _setAuthentication_token = async () => {
    let isAuthenticated = this.props.isAuthenticated;
    let error = this.props.error;

    if(error){
      // console.log(error_message);
    } else {
      if(isAuthenticated == true) {
        try {
             await AsyncStorage.multiSet([
                ['@email:key', this.props.email],
              ]);
          // await AsyncStorage.setItem('@authentication_token:key', this.props.authentication_token);
          // this.props.navigation.navigate('drawerStack');
          this._navigateTo('drawerStack');
          console.log('deveria navegar');
        } catch (error) {
          // Error saving data
        }
      }
    }
  }

  render(){
    return(
      <KeyboardAvoidingView behavior='padding'>
        <View style={styles.container}>
          {this.renderError()}
          <TextInput
            editable={!this.props.isFetching}
            style={[styles.input, styles.inputFirst, this.disabledInputStyle()]}
  					placeholder='Email'
  					autoCapitalize={'none'}
  					returnKeyType={'next'}
  					autoCorrect={false}
            placeholderTextColor='#AAAAAA'
            underlineColorAndroid='transparent'
            ref={(input) => this.emailInput = input}
            keyboardType={'email-address'}
            onChangeText={this.emailChanged.bind(this)}
            value={this.props.email}
            onSubmitEditing={() => this.passwordInput.focus()} />

          <TextInput
            editable={!this.props.isFetching}
            style={[styles.input, this.disabledInputStyle()]}
  					placeholder='Senha'
  					autoCapitalize={'none'}
            returnKeyType={'done'}
  					autoCorrect={false}
            secureTextEntry
            placeholderTextColor='#AAAAAA'
            underlineColorAndroid='transparent'
            ref={(input) => this.passwordInput = input}
            onChangeText={this.passwordChanged.bind(this)}
            value={this.props.password} />

          <View style={styles.buttonSubmitWrapper}>
            {this.renderButton()}
          </View>

        </View>
			</KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error,
  error_message: state.auth.error_message,
  isFetching: state.auth.isFetching,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { emailChanged, passwordChanged, userLogin })(LoginForm);

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
	},
  input: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: DEVICE_WIDTH - 100,
    height: 40,
    paddingLeft: 10,
    marginHorizontal: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    color: '#555555',
    marginTop: 15
  },
  inputFirst: {
    marginTop: 0
  },
  buttonSubmitWrapper:{
    marginTop: 20,
    height: 50
  }
});