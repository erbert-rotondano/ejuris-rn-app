import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import {TextInput} from 'react-native';

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
	        		<Text style={styles.itemLabel}>Observação: </Text><Text>{observacao}</Text>
	        	</View>
	        	<View style={styles.row}>
	        		<Text style={styles.itemLabel}>Observação da Unidade: </Text><Text>{observacao_unidade}</Text>
	        	</View>
	        	<View style={styles.secondSection}>
		        	<View style={styles.row}>
		        		<View style={styles.column}>
		        			<Text style={styles.subtitle}>Envie uma observação sobre este atendimento: </Text>
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
							  onPress={() => this.sendText(this.state.msg)}
							  title='Enviar mensagem' />
		        		</View>
		        	</View>
	        	</View>
	       	</View>

       	</ScrollView>
    );
  }
  sendText(text){
  	// make api call with redux, axios, and other stuff
  	console.log(text);
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
export default ProcessDetail;