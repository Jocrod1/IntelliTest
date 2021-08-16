/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AuthContext} from './src/Navigation/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/Login';
import RootNavigation from './src/Navigation/RootStack';
import WelcomeNavigation from './src/Navigation/WelcomeNavigation';
import ImageView from './src/widgets/ImageView';
import icLogo from './src/assets/icons/logo.png';

const DetailsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [Modules, setModules] = React.useState([]);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.userToken,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: token => {
        // setUserToken('fgks');
        // setIsLoading(false);
        dispatch({type: 'LOGIN', userToken: token});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('@User_object');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      const item = await AsyncStorage.getItem('@User_object');
      const ValueUser = item != null ? JSON.parse(item) : null;

      if (ValueUser) {
        setModules(ValueUser.modules);
      }

      // console.log(ValueUser.modules);
      //ALGORITMO PARA HACER EL MENU ARBOL (LISTO :D)
      //En la lista, hay varios que no se renderizan
      //dichos que no se renderizan pueden ser padres
      //hay que filtrar todas las opciones que no se renderizan
      //ya sea que sus padres tienen "is_render" false o que ellos mismos tienen "is_render" en false

      dispatch({
        type: 'RETRIEVE_TOKEN',
        userToken: ValueUser ? ValueUser?.token : null,
      });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ImageView style={styles.icon} resizeMode="contain" source={icLogo} />
      </View>
    );
  }

  // console.log(loginState.userToken);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <WelcomeNavigation modules={Modules} />
        ) : (
          <RootNavigation />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  icon: {
    width: 250,
    height: 130,
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 50,
  },
});

export default App;
