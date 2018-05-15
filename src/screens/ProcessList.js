import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

class ProcessList extends Component {
  process = [
		{id: 1, title: 'Um processo teste'},
		{id: 2, title: 'Outro processo teste'},
		{id: 3, title: 'Mais Um processo teste'},
		{id: 4, title: 'Um outro processo teste'},
		{id: 5, title: 'Um processo teste diferente'},
		{id: 6, title: 'Um processo teste que não é o mesmo'},
		{id: 7, title: 'Um processo teste qualquer'},
		{id: 8, title: 'Esse aqui é outro processo teste'},
		{id: 9, title: 'Um simples processo teste'},
		{id: 10, title: 'Mais outro processo teste'},
		{id: 11, title: 'Outro processo teste'},
		{id: 12, title: 'Mais Um processo teste'},
		{id: 13, title: 'Um outro processo teste'},
		{id: 14, title: 'Um processo teste diferente'},
		{id: 15, title: 'Um processo teste que não é o mesmo'},
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
	                  title={l.title}
	                />
	              ))}
	            </List>
            </ScrollView>
    );
  }
}

export default ProcessList;