import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { List, ListItem, Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {APP_COLOR, DEVICE_WIDTH} from '../config/constants';

class AddProcessScreen extends Component {
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
                onChangeText={() => console.log('mudou texto')}/>

          <TextInput
                style={styles.input}
                placeholder='Unidade Judicial: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={() => console.log('mudou texto')}/>

          <TextInput
                style={styles.input}
                placeholder='Número do Processo: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={() => console.log('mudou texto')}/>

          <TextInput
                style={styles.input}
                placeholder='Classe de Diligência: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={() => console.log('mudou texto')}/>

          <TextInput
                style={styles.input}
                placeholder='Observação: '
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholderTextColor='#AAAAAA'
                underlineColorAndroid='transparent'
                onChangeText={() => console.log('mudou texto')}/>
			 
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

export default AddProcessScreen;