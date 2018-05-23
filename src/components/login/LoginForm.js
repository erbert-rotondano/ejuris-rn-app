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
import md5 from "react-native-md5";

class LoginForm extends Component {
  
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
    
    const passwordEncrypted = md5.hex_md5( this.props.password + '' );
        console.log(">>>>hex_md5:", this.props.password);
    // console.log(passwordEncrypted);
    this.props.userLogin({ email: this.props.email, password: passwordEncrypted });
    // setTimeout(() => {
    //   this._setAuthentication_token().done();     
    // }, 400);

    
    
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
    // if(this.props.isAuthenticated){
    //   // set auth
    //   AsyncStorage.multiSet([
    //         ['@email:key', this.props.email],
    //         ['@password:key', this.props.password]
    //       ]).then(() => {
    //             console.log('deveria navegar');
    //       })
        
    //     .catch (error => {
    //       console.log('deu erro');
    //     });
    //     this.props.navigation.navigate('Home');
      
    // }
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
    this._loadAuthentication_token().done();
  }

  // componentDidUpdate() {
    
  // }
  componentDidUpdate(prevProps, prevState) {
    this._setAuthentication_token().done(); 
  }
  _loadAuthentication_token = async () => {
    AsyncStorage.getItem('@email:key').then((email) => {
      AsyncStorage.getItem('@password:key').then((password) => {
        if(email && password && this.props.isAuthenticated){
          this.props.navigation.navigate('Home');
        }
      }).catch((error) => {
        console.log('não achou senha:', error);
      });
    }).catch((error) => {
      console.log('não achou email:', error);
    });
  }

  _setAuthentication_token = async () => {
    console.log('set auth chamado');
    let isAuthenticated = this.props.isAuthenticated;
    let error = this.props.error;

    if(error){
      console.log(this.props.error_message);
    } else {
      if(isAuthenticated == true) {    
        console.log('should auth');
          AsyncStorage.setItem('@email:key', this.props.email).then(() => {
            console.log('setando email');
            AsyncStorage.setItem('@password:key', this.props.password).then(() => {
              if(this.props.password){
                this.props.navigation.navigate('Home');
                console.log('deveria navegar');      
              } else {
                console.log('senha tava null');      
              }
              }).catch(() => {
                console.log('erro ao setar a senha');
              })
              console.log('setou email');
          }).catch(() => {
              console.log('erro ao setar email');
          })
      } else {
        console.log('not auth');
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