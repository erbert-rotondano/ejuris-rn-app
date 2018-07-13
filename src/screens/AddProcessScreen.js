import React, { Component } from 'react';
import { View, TextInput, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import {
  addProcess,
  fetchProcessInfo
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
      classeDiligencia: '',
      id_user: ''
    }
  }
  componentWillMount(){

    AsyncStorage.getItem('@user_id:key').then((id) => {
      this.setState({id_user: id});
    }).catch((error) => {
      console.log(error);
    });

    this.props.fetchProcessInfo();

  }
  componentDidUpdate(){
    if(this.props.loaded){
       Alert.alert(
        'Processo cadastrado com sucesso',
        '',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
        ],
        { cancelable: true }
      )
    }
  }
  render(){
    return(
        <KeyboardAvoidingView behavior="position">
        	<Text style={{fontSize: 15, marginLeft: 15, marginTop: 20}}> Informações do Atendimento </Text>
          <TextInput
                style={styles.input}
                placeholder='Cidade: '
                autoCapitalize={'none'}
                returnKeyType={'next'}
                ref={(input) => this.cidade = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({cidade: value})}
                onSubmitEditing={() => this.unidadeJudicial.focus()} />

          <TextInput
                style={styles.input}
                placeholder='Unidade Judicial: '
                autoCapitalize={'none'}
                returnKeyType={'next'}
                ref={(input) => this.unidadeJudicial = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({unidadeJudicial: value})}
                onSubmitEditing={() => this.numero.focus()} />

          <TextInput
                style={styles.input}
                placeholder='Número do Processo: '
                autoCapitalize={'none'}
                returnKeyType={'next'}
                ref={(input) => this.numero = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({numero: value})}
                onSubmitEditing={() => this.protocolo.focus()} />
          <TextInput
                style={styles.input}
                placeholder='Número do Protocolo: '
                autoCapitalize={'none'}
                returnKeyType={'next'}
                ref={(input) => this.protocolo = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({protocolo: value})}
                onSubmitEditing={() => this.classeDiligencia.focus()} />

          <TextInput
                style={styles.input}
                placeholder='Classe de Diligência: '
                autoCapitalize={'none'}
                returnKeyType={'next'}
                ref={(input) => this.classeDiligencia = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({classeDiligencia: value})}
                onSubmitEditing={() => this.observacao.focus()} />

          <TextInput
                style={styles.input}
                placeholder='Observação: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                ref={(input) => this.observacao = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({observacao: value})}/>
			 
          <Button
                style={{marginTop: 15}} 
                raised
                backgroundColor={APP_COLOR}
                onPress={() => {this.handleButtonPress()}}
                title='Submeter' />
       	</KeyboardAvoidingView>
    );
  }
  handleButtonPress(){
    const {numero, protocolo, classeDiligencia, observacao, cidade} = this.state;
      this.props.addProcess(numero, protocolo, classeDiligencia, observacao, cidade, 'a', this.state.id_user, 1);    
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
  loading: state.userprocess.loading,
  loaded: state.userprocess.loaded,
  info: state.userprocess.info,
  infoLoaded: state.userprocess.infoLoaded,
  infoLoading: state.userprocess.infoLoading,
});

export default connect(mapStateToProps, {
  addProcess, fetchProcessInfo
})(AddProcessScreen);
