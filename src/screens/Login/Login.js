import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import PasswordToggle from '../../widgets/PasswordToggleInput';
import {
  CENTER,
  INPUT,
  OVAL_BUTTON_CONTAINER,
  OVAL_BUTTON_TEXT,
} from '../../assets/styles';
import language from '../../assets/lang/lang';
import TextButton from '../../widgets/TextButton';
import api from '../../utils/api';
import ImageView from '../../widgets/ImageView';
import icLogo from '../../assets/icons/logo.png';
import {AuthContext} from '../../Navigation/context';

const lang = language.esp;

const Login = () => {
  const [textemail, setTextemail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, SetSubmitting] = useState(false);

  const {signIn} = React.useContext(AuthContext);

  const login = async () => {
    if (submitting) return;
    SetSubmitting(true);

    if (textemail === '') {
      alert('El campo de correo electrónico es obligatorio');
      SetSubmitting(false);
      return;
    } else if (password === '') {
      alert('El campo de contraseña  es obligatorio');
      SetSubmitting(false);
      return;
    }

    const loginData = {email: textemail, password: password};

    console.log(loginData);

    try {
      let user = await api.login(loginData);

      const formatedArray = user?.modules.map(x => {
        const splitted = x.path.split('.');
        const pathArr = splitted.map(x => parseInt(x));
        const parent = pathArr.length <= 1 ? [0] : pathArr.slice(0, -1);
        return {
          ...x,
          id: x.id_module,
          parent: parent,
        };
      });

      const sortedArray = formatedArray.sort((a, b) => {
        if (a.parent[0] === b.parent[0]) {
          return a.order - b.order;
        }
        return a.parent[0] - b.parent[0];
      });

      //RESULTADO MODULOS HÁBILES
      const deletedNotRendered = sortedArray.filter(x => {
        if (x.is_render === 0) return false;

        if (x.parent[0] === 0) return true;

        return !x.parent.some(parent => {
          const Trying = formatedArray
            .filter(y => y.is_render === 0)
            .some(NRmodule => NRmodule.id === parent);
          return Trying;
        });
      });

      user.modules = deletedNotRendered;

      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('@User_object', jsonValue);

      signIn(user.token);
    } catch (e) {
      console.log(e);
    } finally {
      SetSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageView style={styles.icon} resizeMode="contain" source={icLogo} />
      <View style={styles.form}>
        <TextInput
          name="user"
          style={{...INPUT, width: '95%'}}
          placeholder={lang.mail}
          placeholderTextColor="black"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={text => setTextemail(text)}
          defaultValue={textemail}
          autoCapitalize="none"
        />
        <PasswordToggle
          style={{...INPUT, width: '95%', marginTop: 10}}
          textStyle={{color: 'black'}}
          placeholder={lang.password}
          placeholderTextColor="black"
          autoCompleteType="password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />
        {submitting ? null : (
          <TextButton
            style={styles.submitContainer}
            textStyle={styles.submit}
            text={lang.logIn}
            onPress={() => login()}
          />
        )}
      </View>
      {submitting ? (
        <View style={styles.form}>
          <View style={styles.submitContainer}>
            <ActivityIndicator size="small" color="white" />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  form: {
    ...CENTER,
    paddingHorizontal: 20,
  },
  inputText: {
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
    borderColor: '#EAEAEA',
    height: 40,
    width: '95%',
  },
  submitContainer: {
    ...OVAL_BUTTON_CONTAINER,
    marginTop: 20,
  },
  submit: {
    ...OVAL_BUTTON_TEXT,
    fontWeight: 'bold',
  },
  icon: {
    width: 250,
    height: 130,
    alignSelf: 'center',
    marginBottom: 32,
  },
});

export default Login;
