import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  Picker,
  Switch,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { TextInputMask } from 'react-native-masked-text'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { ButtonSubmit } from './ButtonSubmit';
import { Spinner } from './Spinner';
import Communications from 'react-native-communications';
import Logo from './Logo';
import LoginSection from './LoginSection';
import { connect } from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  passwordConfirmationChanged,
  usernameChanged,
  phoneChanged,
  addressChanged,
  competenceChanged,
  userSignup
} from '../../actions/auth';
import {APP_COLOR} from '../../config/constants';
import md5 from "react-native-md5";

class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {date:null}
    this.state = {address:''}
    this.state = {phoneArea:''}
  }

  addressIsValid() {    
    let valid = this.refs['addressInput'].isValid()
    return valid;
  }

  validateAddressInput(){
    if(this.props.address != ''){
      if(!this.addressIsValid()) {
        Alert.alert(
          'Endereço inválida', 'Informe um endereço válido.',
          [ {text: 'OK'}, ],
          { cancelable: false }
        )
        this.addressChanged('');
        this.refs['addressInput'].getElement().clear();
        this.refs['addressInput'].getElement().focus();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._setAuthentication_token().done(); 
  }

  emailChanged(value) {
    const email = value.trim();
    this.props.emailChanged(email);
  }

  passwordChanged(value) {
    this.props.passwordChanged(value.trim());
  }

  passwordConfirmationChanged(value) {
    this.props.passwordConfirmationChanged(value.trim());
  }

  usernameChanged(value) {
    this.props.usernameChanged(value);
  }

  phoneChanged(value) {
    this.props.phoneChanged(value.trim());
  }

  addressChanged(value) {
    this.props.addressChanged(value);
    this.setState({date: value});
    this._setUserAddress(value);
  }

  competenceChanged(index, value) {
    this.props.competenceChanged(value);
  }


  _formataddress(value) {
    let res = value.split("/");
    
    return res[2]+'-'+res[1]+'-'+res[0];
  } 

  _setUserAddress(value) {
    this.setState({address: value});
  }

  _passwordVerification(password, password_confirmation) {
    if (password === password_confirmation) {
      return true;
    } else {
      return false;
    }
  }

  _validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return true;
    } else {
      // console.log("Invalid email");
      // this.props.emailChanged("");
      // this.emailInput.focus();
      return false;
    }
  };

  _validatePhoneArea(phoneArea) {
    // let unmaskedPhone = (""+phoneArea).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\D/g]/gi, '');

    if (phoneArea.length == 2) {
      return true;
    } else {
      return false;
    }
  };

  // _maskPhoneNumber(){
  //   let phone = this.props.phone;
  //   let unmaskedPhone = (""+phone).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\D/g]/gi, '');
    
  //   if (unmaskedPhone.length = 11) {
  //     let number = unmaskedPhone.match(/^(\d{2})(\d{9})$/);
  //     let maskedPhone = (!number) ? phone : "(" + number[1] + ") " + number[2];
  //     this.props.phoneChanged(maskedPhone);
  //   }

  // }

  // _unmaskPhoneNumber(){
  //   let phone = this.props.phone;
  //   let unmaskedPhone = phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\//\D/g]/gi, '');
  //   this.props.phoneChanged(unmaskedPhone);
  // }

  onButtonPress() {
    const { email, password, password_confirmation, username, phone,
            address, competence } = this.props;
    let phoneArea = this.state.phoneArea;
    
    this.setState({formError: false});

    // if ( email && password && password_confirmation && username && phone && phoneArea &&
    //   address && competence && agreement_status ) {
    if ( email && password && password_confirmation && username && phone && phoneArea ) {
      
      if (this._validatePhoneArea(phoneArea)){

        if (this._validateEmail(email)){

          if ( this._passwordVerification(password, password_confirmation) ) {
            
            if ( this.state.age < 18 ) {
              Alert.alert(
                'Restrição de idade', 'Apenas usuários com 18 anos ou mais podem se cadastrar.',
                [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
                { cancelable: false }
              )
            } else {
              if(password != '' && password != 'undefined'){
                const passwordEncrypted = md5.hex_md5( password + '' );
                this.props.userSignup({ email, password: passwordEncrypted, password_confirmation, username, phoneArea, phone, address, competence});  
              } else {
                Alert.alert(
                  'Senha Inválida', 'Houve algum problema, tente novamente com outra senha',
                  [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
                  { cancelable: false }
                )
              }           
            }

          } else {
            Alert.alert(
              'Senha Inválida', 'Os campos Senha e Confirmação de senha devem ser iguais.',
              [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
              { cancelable: false }
            )
          }

        } else {
          Alert.alert(
            '', 'Email inválido. Por favor, verifique.',
            [ {text: 'OK', onPress: () => this.emailInput.focus()}, ],
            { cancelable: false }
          )
        }

      } else {
        Alert.alert(
          '', 'Telefone inválido. O telefone deve possuir o DDD.',
          [ {text: 'OK', onPress: () => this.phoneInput.focus()}, ],
          { cancelable: false }
        )
      }

    } else {
      Alert.alert(
        '', 'É necessário preencher todos os campos.',
        [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
        { cancelable: false }
      )
    }

  }

  renderError() {
    if (this.props.error) {
      if (this.props.signup_error_message) {
        return (
          <Text style={ styles.error }>
            {this.props.signup_error_message}
          </Text>
        );
      }
    }
    return null;
  }

  renderButton() {
    if (this.props.isFetching) {
      return <Spinner size="small" />;
    }

    return (
      <ButtonSubmit onPress={this.onButtonPress.bind(this)}>
        Cadastre-se
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
  _setAuthentication_token = async () => {
    console.log('set auth chamado');
    let isAuthenticated = this.props.isAuthenticated;
    let error = this.props.error;

    if(error){
      console.log(this.props.error_message);
    } else {
      if(isAuthenticated == true) {    
        console.log('should auth', this.props.email);
          AsyncStorage.setItem('@email:key', this.props.email).then(() => {
            console.log(this.props.email);
            if(this.props.password){
              const passwordEncrypted = md5.hex_md5( this.props.password + '' );
              console.log('setando senha...: ', this.props.password);
              AsyncStorage.setItem('@password:key', this.props.password).then(() => {
                console.log('setando id...: ', this.props.user_id);
                AsyncStorage.setItem('@user_id:key', this.props.user_id+'').then(() => {
                  console.log('navegando..');
                  this.props.navigation.navigate('Navigator');
                  console.log('deveria navegar');  
                }).catch((error) => {
                  console.log('erro ao setar o id: ', error);
                })                    
              }).catch(() => {
                console.log('erro ao setar a senha');
              })
            } else {
                console.log('senha tava null');      
            }
            
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
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={
          Platform.select({
            ios: () => 0,
            android: () => -500
          })()
         }
      >

      <ScrollView>
        <View style={styles.container}>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={ () => this.props.navigation.goBack() }
            >
              <Text style={[styles.text,{textAlign:'center',marginBottom:20,color:'#555555'}]}>Já possui uma conta?<Text style={{color: APP_COLOR}}> Acesse aqui.</Text></Text>
            </TouchableOpacity>

            {this.renderError()}

            <TextInput
              editable={!this.props.isFetching}
              style={[styles.input, styles.inputFirst, this.disabledInputStyle()]}
              placeholder='Nome Completo'
              autoCapitalize={'none'}
              returnKeyType={'next'}
              autoCorrect={false}
              placeholderTextColor='#AAAAAA'
              underlineColorAndroid='transparent'
              onChangeText={this.usernameChanged.bind(this)}
              value={this.props.username}
              onSubmitEditing={() => this.emailInput.focus()} />

            <TextInput
              editable={!this.props.isFetching}
              style={[styles.input, this.disabledInputStyle()]}
              placeholder='Email'
              autoCapitalize={'none'}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              autoCorrect={false}
              placeholderTextColor='#AAAAAA'
              underlineColorAndroid='transparent'
              ref={(input) => this.emailInput = input}
              onChangeText={this.emailChanged.bind(this)}
              value={this.props.email}
              onSubmitEditing={() => this.phoneInput.focus()}
              // onBlur={(e) => this._validateEmail(e.nativeEvent.text)}
              />

            <View style={{ flex:1, flexDirection: 'row'  }}>
              <TextInput
                editable={!this.props.isFetching}
                style={[styles.phoneInput, this.disabledInputStyle()]}
                placeholder='DDD'
                maxLength={2}
                autoCapitalize={'none'}
                returnKeyType={'next'}
                keyboardType={'phone-pad'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                ref={(input) => this.phoneAreaInput = input}
                onChangeText={(value) => this.setState({phoneArea: value})}
                value={this.state.phoneArea}
                // onBlur={(e) => this._maskPhoneNumber()}
                // onFocus={(e) => this._unmaskPhoneNumber()}
                // onSubmitEditing={() => this.birthInput.focus()}
              />
              <TextInput
                editable={!this.props.isFetching}
                style={[styles.phoneInput, this.disabledInputStyle(), {marginRight:20,flex:2}]}
                placeholder='Telefone'
                // maxLength={}
                autoCapitalize={'none'}
                returnKeyType={'next'}
                keyboardType={'phone-pad'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                ref={(input) => this.phoneInput = input}
                onChangeText={this.phoneChanged.bind(this)}
                value={this.props.phone}
                // onBlur={(e) => this._maskPhoneNumber()}
                // onFocus={(e) => this._unmaskPhoneNumber()}
                // onSubmitEditing={() => this.birthInput.focus()}
              />
            </View>

            <TextInput
                editable={!this.props.isFetching}
                style={[styles.phoneInput, this.disabledInputStyle(), {marginRight:20,flex:2}]}
                placeholder='Endereço'
                autoCapitalize={'none'}
                returnKeyType={'next'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                ref={(input) => this.addressInput = input}
                onChangeText={this.addressChanged.bind(this)}
                value={this.props.address}
              />
              <TextInput
                editable={!this.props.isFetching}
                style={[styles.phoneInput, this.disabledInputStyle(), {marginRight:20,flex:2}]}
                placeholder='Competencia'
                autoCapitalize={'none'}
                returnKeyType={'next'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                ref={(input) => this.competenceInput = input}
                onChangeText={this.competenceChanged.bind(this)}
                value={this.props.competence}
              />

            <TextInput
              editable={!this.props.isFetching}
              style={[styles.input, this.disabledInputStyle()]}
    					placeholder='Senha'
    					autoCapitalize={'none'}
              returnKeyType={'next'}
    					autoCorrect={false}
              secureTextEntry
              placeholderTextColor='#AAAAAA'
              underlineColorAndroid='transparent'
              onChangeText={this.passwordChanged.bind(this)}
              value={this.props.password}
              ref={(input) => this.passwordInput = input}
              onSubmitEditing={() => this.passwordConfInput.focus()}/>

            <TextInput
              editable={!this.props.isFetching}
              style={[styles.input, this.disabledInputStyle()]}
              placeholder='Confirmação de Senha'
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              secureTextEntry
              placeholderTextColor='#AAAAAA'
              underlineColorAndroid='transparent'
              onChangeText={this.passwordConfirmationChanged.bind(this)}
              value={this.props.password_confirmation}
              ref={(input) => this.passwordConfInput = input}/>

            <View style={styles.buttonSubmitWrapper}>
              {this.renderButton()}
            </View>

  			
        </View>
        <View style={{ height:40 }}/>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  user_id: state.auth.user_id,
  password_confirmation: state.auth.password_confirmation,
  username: state.auth.username,
  phone: state.auth.phone,
  address: state.auth.address,
  competence: state.auth.competence,
  error: state.auth.error,
  signup_error_message: state.auth.signup_error_message,
  isFetching: state.auth.isFetching,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  passwordConfirmationChanged,
  usernameChanged,
  phoneChanged,
  addressChanged,
  competenceChanged,
  userSignup
})(SignupForm);

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: DEVICE_HEIGHT-590
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
  phoneInput: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    // width: DEVICE_WIDTH - 100,
    flex:1,
    height: 40,
    paddingLeft: 10,
    // marginHorizontal: 20,
    marginLeft: 20,
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
  },
  error: {
    textAlign: 'center',
    fontSize: 14,
    color: '#cc3333',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:10,
  }
});
