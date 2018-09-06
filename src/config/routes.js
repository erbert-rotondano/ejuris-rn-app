import React, { Component } from 'react'
import {TouchableOpacity, View} from 'react-native';
import { Icon } from 'react-native-elements';
import Home from '../screens/Home'
import TestScreen from '../screens/TestScreen';
import AddProcessScreen from '../screens/AddProcessScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import UserOptions from '../screens/UserOptions';
import UserProfile from '../screens/UserProfile';
import FAQ from '../screens/FAQ';
import Contact from '../screens/Contact';
import About from '../screens/About';
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
const options = (navigation) => {
  return (
     <TouchableOpacity onPress={() =>  navigation.navigate('UserOptions')} >
      <Icon
        name='user'
        type='entypo'
        iconStyle={{ fontSize: 24, color: '#FFFFFF' }}
        containerStyle={{ paddingLeft: 4, paddingRight: 16 }}
      />
    </TouchableOpacity>
  )
}
export const GeneralStack = new StackNavigator({
  Home: { 
  	screen: Home,
  	navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Home',
      title: 'Balcão Virtual',
      gesturesEnabled: false,
      backBehavior: 'none',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      // header: {
      //   left: null
      // },
      headerTintColor: '#fff',
      headerLeft: null,
      headerRight: options(navigation),
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
      headerRight: options(navigation),
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
      headerRight: options(navigation),
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
      headerRight: options(navigation),
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
      headerRight: options(navigation),
      // headerLeft: back(navigation)
    })
  },
  UserOptions: { 
    screen: UserOptions ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'UserOptions',
      title: 'Área do Usuário',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  UserProfile: { 
    screen: UserProfile ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'UserProfile',
      title: 'Detalhes do Usuário',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  FAQ: { 
    screen: FAQ ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'FAQ',
      title: 'Perguntas Frequentes',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
  Contact: { 
    screen: Contact ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Contact',
      title: 'Contate-nos',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
   About: { 
    screen: About ,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'About',
      title: 'Sobre nós',
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
    })
  },
},{
  initialRouteName: 'Home',
});
export const LoginStack = new StackNavigator({
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
});
const Navigation = StackNavigator({
  Login: {screen: LoginStack},
  Home: {screen: GeneralStack},
},{
  headerMode: 'none',
  title: 'Main',
})

class Nav extends Component {
  render() {
    return (
        <Navigation />
    )
  }
}
      
export default Nav;