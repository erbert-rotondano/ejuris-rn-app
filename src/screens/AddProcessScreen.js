import React, { Component } from 'react';
import { View, TextInput, AsyncStorage, Alert, KeyboardAvoidingView, Picker } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR, DEVICE_WIDTH, CIDADES} from '../config/constants';
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
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.cidade}
            onValueChange={(itemValue, itemIndex) => this.setState({cidade: itemValue})}>
            <Picker.Item label="Selecione uma Cidade" value="empty" key="empty" />
            {this.renderCityPickItems()}
          </Picker>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.unidadeJudicial}
            onValueChange={(itemValue, itemIndex) => this.setState({unidadeJudicial: itemValue})}>
            <Picker.Item label="Selecione uma Unidade Judicial" value="empty" key="empty" />
            {this.renderUniPickItems()}
          </Picker>

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
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.classeDiligencia}
            onValueChange={(itemValue, itemIndex) => this.setState({classeDiligencia: itemValue})}>
            <Picker.Item label="Selecione uma Classe de Diligência" value="empty" key="empty" />
            {this.renderDilPickItems()}
          </Picker>

          <TextInput
                style={styles.lastInput}
                placeholder='Observação: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                ref={(input) => this.observacao = input}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={(value) => this.setState({observacao: value})}/>
			 
          <Button
                style={{marginTop: 150}} 
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
  renderDilPickItems(){
      return this.props.diligencia.map((dil) => 
        (<Picker.Item label={dil.descricao} value={dil.id_classe_diligencia} key={dil.id_classe_diligencia} />)
      )
  }
  renderUniPickItems(){
      return this.props.unidadeJudicial.map((unidadeJudicial) => 
        (<Picker.Item label={unidadeJudicial.nome} value={unidadeJudicial.id_unidade} key={unidadeJudicial.id_unidade} />)
      )
  }
  renderCityPickItems(){
      return CIDADES.map((cidade) => 
        (<Picker.Item label={cidade} value={cidade} key={cidade} />)
      )
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
    pickerStyle: {
      backgroundColor: 'rgba(255,255,255,0.4)',
      width: DEVICE_WIDTH - 50,
      height: 40,
      paddingLeft: 10,
      marginHorizontal: 20,
      borderRadius: 3,
      marginTop: 15,
      borderWidth: 1,
      borderColor: '#252525',
      color: '#555555',
    },
    lastInput: {
      backgroundColor: 'rgba(255,255,255,0.4)',
      width: DEVICE_WIDTH - 50,
      height: 40,
      paddingLeft: 10,
      marginHorizontal: 20,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      color: '#555555',
      marginTop: 15,
      marginBottom: 15
    },
}


const mapStateToProps = (state) => ({
  loading: state.userprocess.loading,
  loaded: state.userprocess.loaded,
  diligencia: state.userprocess.diligencia,
  unidadeJudicial: state.userprocess.unidadeJudicial,
  infoLoaded: state.userprocess.infoLoaded,
  infoLoading: state.userprocess.infoLoading,
});

export default connect(mapStateToProps, {
  addProcess, fetchProcessInfo
})(AddProcessScreen);
