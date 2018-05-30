import React, { Component } from 'react';
import { View, TextInput, AsyncStorage } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import {
  addProcess,
} from '../actions/process';
import { connect } from 'react-redux';

class AddProcessScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      unidadeJudicial: '',
      cidade: '',
      numero: '',
      protocolo: '',
      observacao: '',
      classeDiligencia: ''
    }
  }
  render(){
    return(
        <View>
        	<Text style={{fontSize: 15, marginLeft: 15, marginTop: 20}}> Informações do Atendimento </Text>
          <TextInput
                style={styles.input}
                placeholder='Cidade: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({cidade: value})}/>

          <TextInput
                style={styles.input}
                placeholder='Unidade Judicial: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({unidadeJudicial: value})}/>

          <TextInput
                style={styles.input}
                placeholder='Número do Processo: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({numero: value})}/>
          <TextInput
                style={styles.input}
                placeholder='Número do Protocolo: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({protocolo: value})}/>

          <TextInput
                style={styles.input}
                placeholder='Classe de Diligência: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({classeDiligencia: value})}/>

          <TextInput
                style={styles.input}
                placeholder='Observação: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({observacao: value})}/>
			 
          <Button
                style={{marginTop: 15}} 
                raised
                backgroundColor={APP_COLOR}
                onPress={() => this.handleButtonPress()}
                title='Submeter' />
       	</View>
    );
  }
  handleButtonPress(){
    const {numero, protocolo, classeDiligencia, observacao, cidade} = this.state;
    AsyncStorage.getItem('@user_id:key').then((id) => {
      this.props.addProcess(numero, protocolo, classeDiligencia, observacao, cidade, 'a', id, 1);
    }).catch((error) => {
      console.log(error);
    })
    
    // numero, protocolo, classe_diligencia, obs, cidade, obs_unidade, id_user, id_unidade
  }
}

const styles = {
  input: {
      backgroundColor: 'rgba(255,255,255,0.4)',
      width: DEVICE_WIDTH - 50,
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
  email: state.auth.email,
  password: state.auth.password,
  user_id: state.auth.user_id
});

export default connect(mapStateToProps, {
  addProcess
})(AddProcessScreen);
