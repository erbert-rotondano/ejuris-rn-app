import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {TextInput} from 'react-native';
import {editProcessObs} from '../actions/process';
import {connect} from 'react-redux';
import Spinner from '../components/common/Spinner';

class ProcessDetail extends Component {
  render(){
  	const { protocolo, numero, id_process, data_abertura, data_fechamento, data_cadastro, classe_diligencia, cidade, observacao, observacao_unidade, fk_unidade, nome_unidade, situacao, status } = this.props.navigation.state.params.item;
    return(
    	<ScrollView style={{flex: 1}}>
	        <View style={styles.generalContainer}>
	        	<Text style={styles.titleText}>Consultar Atendimento</Text>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Protocolo: </Text><Text>{protocolo}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Número do Processo: </Text><Text>{numero}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Unidade Judicial: </Text><Text>{nome_unidade}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Data/Hora Abertura: </Text><Text>{data_abertura}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Classe de Diligência: </Text><Text>{classe_diligencia}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Status: </Text><Text>{status}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Observação: </Text><Text>{observacao}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Observação da Unidade: </Text><Text>{observacao_unidade}</Text>
	        	</View>
	        	<View style={styles.secondSection}>
		        	<View style={styles.row}>
		        		<View style={styles.column}>
		        			<Text style={styles.subtitle}>Envie uma observação sobre este atendimento: </Text>
			        		{this.renderButton(id_process)}
		        		</View>
		        	</View>
	        	</View>
	       	</View>

       	</ScrollView>
    );
  }
  renderButton(id_process){
  	 if( this.props.editLoading ){
        return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner size="large" />
          </View>
        )
      } else {
        if(this.props.editLoaded){
          return(
            <View>
            	<TextInput
		            style={styles.input}
  					placeholder='Mensagem: '
  					autoCapitalize={'none'}
		            returnKeyType={'done'}
  					autoCorrect={true}
		            placeholderTextColor='#AAAAAA'
		            underlineColorAndroid='transparent'
		            onChangeText={(value) => this.setState({msg: value})}/>
        		<Button
				  raised
				  backgroundColor={APP_COLOR}
				  onPress={() => this.sendText(id_process, this.state.msg)}
				  title='Enviar mensagem' />
            </View>
          )
        } else {
        return(
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: '#252525', textAlign: 'center'}}>
              Há algum problema com o servidor, tente novamente mais tarde.
            </Text>
          </View>
        )
      }
    }
  }
  sendText(id_process, msg){
  	// make api call with redux, axios, and other stuff
  	this.props.editProcessObs(id_process, msg);
  	if(this.props.editLoaded){
	       Alert.alert(
	        'Mensagem enviada com sucesso',
	        '',
	        [
	          {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
	        ],
	        { cancelable: true }
	      )
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
  editLoading: state.userprocess.editLoading,	
  editLoaded: state.userprocess.editLoaded
});

export default connect(mapStateToProps, {editProcessObs})(ProcessDetail);