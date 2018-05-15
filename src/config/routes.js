import React, { Component } from 'react'
import {TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import Home from '../screens/Home'
import TestScreen from '../screens/TestScreen'
import Login from '../screens/Login'
import ProcessDetail from '../screens/ProcessDetail'

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
      headerStyle: {
        backgroundColor: 'rgba(54,57,62,1)',
      },
      headerTintColor: '#fff',
      // headerLeft: back(navigation)
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