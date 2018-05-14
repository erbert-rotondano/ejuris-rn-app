import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import Home from '../screens/Home';



const back = (navigation) => {
  return(
    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())} >
      <Icon
        name='arrow-back'
        //type='entypo'
        iconStyle={{ fontSize: 24, color: '#FFFFFF' }}
        containerStyle={{ paddingLeft: 16, paddingRight: 4 }}
      />
    </TouchableOpacity>
  );
}



// Auth routes
// export const AuthStack = StackNavigator({
//   Login: {
//     screen: Login,
//     navigationOptions: ({
//       gesturesEnabled: false,
//     })
//   },
//   Signup: {
//     screen: Signup,
//     navigationOptions: ({
//       gesturesEnabled: false,
//     })
//   }
// },{
//   initialRouteName: 'Login',
//   headerMode: 'none',
// });

// Home routes
export const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Destaques',
      headerStyle: {
        backgroundColor: 'rgba(242,105,53,.95)',
      },
      headerTintColor: '#fff',
      gesturesEnabled: false,
      backBehavior: 'none'
    })
  }
});


export const Navigation = StackNavigator({
  HomeStack: {screen: Home}
},{
  headerMode: 'none',
  title: 'Main',
})
