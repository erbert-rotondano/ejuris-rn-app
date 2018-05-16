import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

class ProcessList extends Component {
  process = [
		{id: 1, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um processo teste'},
		{id: 2, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Outro processo teste'},
		{id: 3, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Mais Um processo teste'},
		{id: 4, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um outro processo teste'},
		{id: 5, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um processo teste diferente'},
		{id: 6, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um processo teste que não é o mesmo'},
		{id: 7, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um processo teste qualquer'},
		{id: 8, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Esse aqui é outro processo teste'},
		{id: 9, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um simples processo teste'},
		{id: 10, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Mais outro processo teste'},
		{id: 11, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Outro processo teste'},
		{id: 12, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Mais Um processo teste'},
		{id: 13, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um outro processo teste'},
		{id: 14, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um processo teste diferente'},
		{id: 15, protocol: 311251, process_number: '0028-1482.144-00BA', title: 'Um processo teste que não é o mesmo'},
	]
  render(){
    return(
        <ScrollView style={{flex: 1}}>
	            <List
	              containerStyle={{
	                marginBottom: 0,
	                marginTop: 0,
	                borderTopWidth: 0,
	              }}>
	              {this.process.map((l, i) => (
	                <ListItem
	                  containerStyle={{borderBottomColor: '#EEE'}}
	                  titleStyle={{ fontSize: 18 }}
                      onPress={ () => this.props.navigation.navigate('ProcessDetail', {item: l}) }
	                  hideChevron
	                  key={l.id}
	                  title={'Processo: ' +l.process_number}
	                  subtitle={'Protocolo: ' + l.protocol}
	                />
	              ))}
	            </List>
            </ScrollView>
    );
  }
}

export default ProcessList;