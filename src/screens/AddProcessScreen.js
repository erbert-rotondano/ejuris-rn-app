import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR} from '../config/constants';

class AddProcessScreen extends Component {
  render(){
    return(
        <View>
        	<Text style={{fontSize: 15, marginLeft: 15, marginTop: 20, borderBottomColor: '#000000',
    borderBottomWidth: 1}}> Informações do Atendimento </Text>
        	<FormLabel>Cidade: </FormLabel>
			    <FormInput containerStyle={styles.formInputStyle} autoFocus onChangeText={(value) => console.log(value)}/>

          <FormLabel>Unidade Judicial: </FormLabel>
          <FormInput containerStyle={styles.formInputStyle} onChangeText={(value) => console.log(value)}/>

          <FormLabel>Número do Processo: </FormLabel>
          <FormInput containerStyle={styles.formInputStyle} onChangeText={(value) => console.log(value)}/>

          <FormLabel>Classe de Diligência: </FormLabel>
          <FormInput containerStyle={styles.formInputStyle} onChangeText={(value) => console.log(value)}/>

          <FormLabel>Observação: </FormLabel>
          <FormInput containerStyle={styles.formInputStyle} onChangeText={(value) => console.log(value)}/>
			 
          <Button
              style={{marginTop: 15}} 
              raised
              backgroundColor={APP_COLOR}
              onPress={() => this.props.navigation.navigate('Home')}
              title='Submeter' />
       	</View>
    );
  }
}
const styles = {
  formInputStyle:{
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  }
}

export default AddProcessScreen;