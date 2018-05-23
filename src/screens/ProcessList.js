import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import {processFetch} from '../actions/process';
import { connect } from 'react-redux';

class ProcessList extends Component {
  
	componentWillMount(){
		AsyncStorage.getItem('@email:key').then((email) => {
			AsyncStorage.getItem('@password:key').then((password) => {
				this.props.processFetch(email, password);	
			}).catch(() => {
				console.log('erro ao pegar a senha');
			})
		}).catch(() => {
				console.log('erro ao pegar o email');
			})
			
		
	}
	renderItems(){
		if(this.props.loaded){
		// this.props.userprocess.map((l, i) => (
	 //                <ListItem
	 //                  containerStyle={{borderBottomColor: '#EEE'}}
	 //                  titleStyle={{ fontSize: 18 }}
  //                     onPress={ () => this.props.navigation.navigate('ProcessDetail', {item: l}) }
	 //                  hideChevron
	 //                  key={l.id}
	 //                  title={'Processo: ' +l.numero}
	 //                  subtitle={'Protocolo: ' + l.protocolo}
	 //                />
	 //              ))
	 	console.log(this.props.userprocess);
		}
	}
  render(){
    return(
        <ScrollView style={{flex: 1}}>
	            <List
	              containerStyle={{
	                marginBottom: 0,
	                marginTop: 0,
	                borderTopWidth: 0,
	              }}>
	              {this.renderItems()}
	            </List>
            </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  userprocess: state.userprocess,
  loading: state.userprocess.loading,	
  loaded: state.userprocess.loaded
});

export default connect(mapStateToProps, {processFetch})(ProcessList);