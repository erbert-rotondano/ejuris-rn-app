import React, { Component } from 'react'
import {TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import Home from '../screens/Home'
import TestScreen from '../screens/TestScreen';
import AddProcessScreen from '../screens/AddProcessScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import SearchResult from '../screens/SearchResult';
import ProcessDetail from '../screens/ProcessDetail';
import ProcessList from '../screens/ProcessList';

import { StackNavigator } from 'react-navigation'

// const back = (navigation) => {
//   return(
//     <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
//       <Icon
//         name='arrow-back'
//         // type='entypo'
//         iconStyle={{ fontSize: 24, color: '#FFFFFF' }}
//         containerStyle={{ paddingLeft: 16, paddingRight: 4 }}
//       />
//     </TouchableOpacity>
//   );
// }

export const Navigator = new StackNavigator({
  Home: { 
  	screen: Home,
  	navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Home',
      title: 'Balcão Virtual',
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      // header: {
      //   left: null
      // },
      headerTintColor: '#fff',
      headerLeft: null
    })
  },
  TestScreen: { 
  	screen: TestScreen ,
  	navigationOptions: ({ navigation }) => ({
      drawerLabel: 'TestScreen',
      title: 'Segunda Tela',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  Login: { 
  	screen: Login ,
  	navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Login',
      title: 'Login',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  ProcessDetail: { 
  	screen: ProcessDetail ,
  	navigationOptions: ({ navigation }) => ({
      drawerLabel: 'ProcessDetail',
      title: 'Detalhes do Processo',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  ProcessList: { 
    screen: ProcessList ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'ProcessList',
      title: 'Lista de Atendimentos',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  AddProcess: { 
    screen: AddProcessScreen ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'AddProcessScreen',
      title: 'Cadastrar novo Atendimento',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  SearchResult: { 
    screen: SearchResult ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'SearchProcess',
      title: 'Resultado de busca',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  SignUp: { 
    screen: Signup ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Signup',
      title: 'Cadastrar-se',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
},{
  initialRouteName: 'Login',
})

class Nav extends Component {
  render() {
    return (
      <Navigator />
    )
  }
}
      
export default Nav;