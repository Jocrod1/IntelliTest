import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomePage/WelcomePage';
import LoginScreen from '../screens/Login/Login';
import {AuthContext} from './context';
import MapScreen from '../screens/Mapa/Mapa';
import HeroesScreen from '../screens/Heroes/Heroes';

import CustomDrawerContent from './CustomDrawerContent';
import CustomHeader from './CustomHeader';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Settings1Screen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings 1 Screen</Text>
    </View>
  );
}

function Settings2Screen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings 2 Screen</Text>
    </View>
  );
}

const drawerItemsMain = [
  {
    key: 'Home',
    title: 'Home',
    routes: [{nav: 'MainDrawer', routeName: 'Home', title: 'Home'}],
  },
  {
    key: 'Settings',
    title: 'Settings',
    routes: [
      {nav: 'MainDrawer', routeName: 'Home', title: 'Settings 1'},
      {nav: 'MainDrawer', routeName: 'Home', title: 'Settings 2'},
    ],
  },
];

function MainDrawerNavigation(props) {
  const {signOut} = React.useContext(AuthContext);

  const ToPublicAPI = () => props.navigation.navigate('Heroes');

  // console.log(props.route.params.modules);

  const modules = props.route.params.modules;

  const formatToRender = modules
    .filter(x => x.parent[0] === 0)
    .map(module => {
      return {
        ...module,
        childs: modules.filter(x => x.parent[0] === module.id),
      };
    });

  const CustomDrawerItems = formatToRender
    .filter(x => x.parent[0] === 0)
    .map(module => {
      return {
        key: module.id.toString(),
        title: module.module,
        routes: module.childs.map(child => {
          return {
            nav: 'MainDrawer',
            routeName: 'Home',
            title: child.module,
            key: child.id.toString(),
          };
        }),
      };
    });
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      drawerContent={props => (
        <CustomDrawerContent
          drawerItems={CustomDrawerItems}
          ToPublicAPI={ToPublicAPI}
          logOut={signOut}
          {...props}
        />
      )}>
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Settings1" component={Settings1Screen} />
      <Drawer.Screen name="Settings2" component={Settings2Screen} />
    </Drawer.Navigator>
  );
}

const WelcomeNavigation = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MainDrawer"
        component={MainDrawerNavigation}
        initialParams={{modules: props.modules}}
      />
      <Stack.Screen name="Mapa" component={MapScreen} />
      <Stack.Screen name="Heroes" component={HeroesScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeNavigation;
