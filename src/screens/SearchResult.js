import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import {processSearch} from '../actions/process';
import Spinner from '../components/common/Spinner';
import { connect } from 'react-redux';

class SearchResult extends Component {
componentWillMount(){
		AsyncStorage.getItem('@email:key').then((email) => {
			AsyncStorage.getItem('@password:key').then((password) => {
				this.props.processSearch(email, password, this.props.navigation.state.params.searchterm);	
			}).catch(() => {
				console.log('erro ao pegar a senha');
			})
		}).catch(() => {
				console.log('erro ao pegar o email');
			})
			
		
	}
	renderItems(){
      if( this.props.loading ){
        return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner size="large" />
          </View>
        )
      } else {
        if(this.props.loaded){
          return(
            <ScrollView style={{flex: 1}}>
            <List
              containerStyle={{
                marginBottom: 0,
                marginTop: 0,
                borderTopWidth: 0,
              }}>
              {this.props.userprocess.map((l, i) => (
	                <ListItem
	                  containerStyle={{borderBottomColor: '#EEE'}}
	                  titleStyle={{ fontSize: 18 }}
                      onPress={ () => this.props.navigation.navigate('ProcessDetail', {item: l}) }
	                  hideChevron
	                  key={l.id_process}
	                  title={'Processo: ' +l.numero}
	                  subtitle={'Protocolo: ' + l.protocolo}
	                />
	              ))}
            </List>
            </ScrollView>
          )
        } else {
        return(
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: '#252525', textAlign: 'center'}}>
              Nenhum atendimento encontrado na busca por: "{this.props.navigation.state.params.searchterm}".
            </Text>
          </View>
        )
      }
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
  userprocess: state.userprocess.userprocess,
  loading: state.userprocess.loading,	
  loaded: state.userprocess.loaded
});

export default connect(mapStateToProps, {processSearch})(SearchResult);