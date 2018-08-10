import React, { Component } from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import {
  userLogout
} from '../actions/auth';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';

class UserOptions extends Component {
 items = [
	 		// {id: 1, title: 'Perfil', routeName: 'UserProfile', icon: 'person'}, 
	 		{id: 2, title: 'Perguntas Frequentes', routeName: 'FAQ', icon: 'question-answer'},
	 		{id: 3, title: 'Contato', routeName: 'Contact', icon: 'mail'},
	 		{id: 4, title: 'Sobre', routeName: 'About', icon: 'info'},
 		];

  renderItems(){
          return(
            <ScrollView style={{flex: 1}}>
	            <List
	              containerStyle={{
	                marginBottom: 0,
	                marginTop: 0,
	                borderTopWidth: 0,
	              }}>
	              {this.items.map((l, i) => (
	                <ListItem
	                  containerStyle={{borderBottomColor: '#EEE'}}
	                  titleStyle={{ fontSize: 18 }}
	                  underlayColor='rgba(242,105,53,.10)'
                      onPress={ () => this.props.navigation.navigate(l.routeName) }
	                  key={l.id}
	                  title={l.title}
	                  leftIcon={{name: l.icon}}
	                />
	              ))}
	              <ListItem
	                  containerStyle={{borderBottomColor: '#EEE'}}
	                  titleStyle={{ fontSize: 18 }}
	                  underlayColor='rgba(242,105,53,.10)'
                      onPress={ () => this._setAuthentication_tokenToNull() }
	                  key={'logout'}
	                  title={'Sair da minha conta'}
	                  leftIcon={{name: 'clear'}}
	                />
	            </List>
            </ScrollView>
          );  
    }
  render(){
    return(
        	this.renderItems()
    );
  }
  _setAuthentication_tokenToNull = async () => {
    try {
      await AsyncStorage.setItem('@authentication_token:key', 'user_is_unlogged');
      await AsyncStorage.setItem('@email:key', 'user_is_unlogged');
      await AsyncStorage.setItem('@password:key', 'user_is_unlogged');
      await AsyncStorage.setItem('@user_id:key', 'user_is_unlogged');
      this.props.userLogout();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
}
}
const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps, {userLogout})(UserOptions);