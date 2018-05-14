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
  Platform
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
  birthDateChanged,
  genderChanged,
  agreementChanged,
  userSignup
} from '../../actions/auth';

class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {date:null}
    this.state = {age:0}
    this.state = {phoneArea:''}
  }

  birthDateIsValid() {    
    let valid = this.refs['birthDateInput'].isValid()
    return valid;
  }

  validateBirthDateInput(){
    if(this.props.birthDate != ''){
      if(!this.birthDateIsValid()) {
        Alert.alert(
          'Data inválida', 'Informe uma data de nascimento válida.',
          [ {text: 'OK'}, ],
          { cancelable: false }
        )
        this.birthDateChanged('');
        this.refs['birthDateInput'].getElement().clear();
        this.refs['birthDateInput'].getElement().focus();
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

  birthDateChanged(value) {
    this.props.birthDateChanged(value);
    this.setState({date: value});
    this._setUserAge(value);
    this.birthDateIsValid();
  }

  genderChanged(index, value) {
    this.props.genderChanged(value);
  }

  agreementChanged(value) {
    this.props.agreementChanged(value);
  }

  _formatBirthDate(value) {
    let res = value.split("/");
    
    return res[2]+'-'+res[1]+'-'+res[0];
  } 

  _setUserAge(value) {
    this.setState({date: value});
    let res = value.split("/");
    
    // TODO: Get "today" from the server side,
    // to avoid a local hack (like changing the local date)
    let today = new Date();
    
    // Value (date) has real month number (1-12)
    // The res[1] -1 inform the month number in Javascript (0-11)
    let brithDate = new Date(res[2], (res[1]-1), res[0]);

    var age = today.getFullYear() - brithDate.getFullYear();
    if ( new Date(today.getFullYear(), (today.getMonth()), today.getDate()) < 
         new Date(today.getFullYear(), brithDate.getMonth(), brithDate.getDate()) ){
      age--;
    }

    this.setState({age: age});
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
            birthDate, gender, agreement_status } = this.props;
    let phoneArea = this.state.phoneArea;
    
    this.setState({formError: false});

    // if ( email && password && password_confirmation && username && phone && phoneArea &&
    //   birthDate && gender && agreement_status ) {
    if ( email && password && password_confirmation && username && phone && phoneArea && agreement_status ) {
      
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
              this.props.userSignup({ email, password, password_confirmation, username, phoneArea, phone, birthDate, gender, agreement_status});
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
    let isAuthenticated = this.props.isAuthenticated;
    let error = this.props.error;

    if(error){
      // console.log(error_message);
    } else {
      if(isAuthenticated == true) {
        try {
             await AsyncStorage.multiSet([
                ['@authentication_token:key', this.props.authentication_token], 
                ['@username:key', this.props.username], 
                ['@email:key', this.props.email],
                ['@area_id:key', this.props.area_id],
                ['@card_number:key', this.props.card_number]
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
        <View style={{ height:200 }}>
          <Logo/>
        </View>
        <View style={styles.container}>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={ () => this.props.navigation.goBack() }
            >
              <Text style={[styles.text,{textAlign:'center',marginBottom:20,color:'#555555'}]}>Já possui uma conta?<Text style={{color: '#F26935'}}> Acesse aqui.</Text></Text>
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

            <TextInputMask
              editable={!this.props.isFetching}
              style={[styles.input, this.disabledInputStyle(), {marginRight:20,flex:2}]}
              placeholder='Data de nascimento'
              placeholderTextColor="#AAA"
              // maxLength={}
              autoCapitalize={'none'}
              returnKeyType={'next'}
              autoCorrect={false}
              underlineColorAndroid='transparent'
              ref={'birthDateInput'}
              value={this.props.birthDate}
              onChangeText={(date) => {this.birthDateChanged(date)}}
              onBlur={() => this.validateBirthDateInput()}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
            />

            <View style={{flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft:20,
                  paddingTop:15}}>
              <Text style={{color:'#555555',marginRight:10}}>Sexo:</Text>
              <RadioGroup
                onSelect = {(index, value) => this.genderChanged(index, value)}
                color='#555555'
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <RadioButton value={1} color='orange' style={{padding:0,margin:0}} disabled={this.props.isFetching}>
                    <Text style={{padding:0,margin:0,color:'#555555',marginRight:10}}>Masculino</Text>
                </RadioButton>

                <RadioButton value={2} color='orange' style={{padding:0,margin:0}} disabled={this.props.isFetching}>
                    <Text style={{padding:0,margin:0,color:'#555555'}}>Feminino</Text>
                </RadioButton>
              </RadioGroup>
            </View>

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

            <View style={styles.switchContainer}>
              <Switch
                onValueChange={(value) => this.agreementChanged(value)}
                style={{marginLeft: 20}}
                value={this.props.agreement_status} />
              <Text style={{ color:'#555555',marginLeft:10,fontSize:12 }}>Concordo com os</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{Communications.web('http://www.clubehappy.com.br/termosdeuso.pdf')}}>
                  <Text style={{ color:'#F26935',marginLeft:5,fontSize:12 }}>termos de uso.</Text>
                </TouchableOpacity>
            </View>

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
  password_confirmation: state.auth.password_confirmation,
  username: state.auth.username,
  card_number: state.auth.card_number,
  area_id: state.auth.area_id,
  phone: state.auth.phone,
  birthDate: state.auth.birthDate,
  gender: state.auth.gender,
  agreement_status: state.auth.agreement_status,
  error: state.auth.error,
  signup_error_message: state.auth.signup_error_message,
  isFetching: state.auth.isFetching,
});

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  passwordConfirmationChanged,
  usernameChanged,
  phoneChanged,
  birthDateChanged,
  genderChanged,
  agreementChanged,
  userSignup
})(SignupForm);

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		//flex: 3,
		//alignItems: 'center',
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
