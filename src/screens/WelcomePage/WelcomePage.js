import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../Navigation/context';
import icDrawer from '../../assets/icons/drawer.png';
import icAddress from '../../assets/icons/address.png';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageView from '../../widgets/ImageView';
import ImageButton from '../../widgets/ImageButton';
import TextView from '../../widgets/Text';
import {
  CENTER,
  INPUT,
  OVAL_BUTTON_CONTAINER,
  OVAL_BUTTON_TEXT,
} from '../../assets/styles';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      Loading: false,
      loadingMore: false,
      dataSource: [],
      search: '',
    };
  }

  fetchDevices = async () => {
    this.setState({loading: true});
    try {
      const item = await AsyncStorage.getItem('@User_object');
      const ValueUser = item != null ? JSON.parse(item) : null;

      const response = await api.getDevices(
        {
          limit: 5,
          offset: 0,
          search: this.state.search,
        },
        ValueUser.token,
      );

      this.setState({
        dataSource: response?.data?.results,
        page: 1,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
  };

  LoadMore = async () => {
    this.setState({loading: true});

    try {
      const item = await AsyncStorage.getItem('@User_object');
      const ValueUser = item != null ? JSON.parse(item) : null;

      const newPage = this.state.page + 1;

      const response = await api.getDevices(
        {
          limit: 5,
          offset: newPage > 1 ? newPage * 5 : 0,
          search: this.state.search,
        },
        ValueUser.token,
      );

      this.setState({
        dataSource: this.state.dataSource.concat(response?.data?.results),
        page: newPage,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({loading: false});
    }
  };

  componentDidMount() {
    this.fetchDevices();
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 5}}>
        <View style={{flexDirection: 'row'}}>
          <ImageButton
            onPress={() => this.props.navigation.toggleDrawer()}
            source={icDrawer}
            resizeMode={'contain'}
            touchableStyle={{
              height: 30,
              width: 30,
              margin: 10,
            }}
          />
          <ImageButton
            onPress={() => this.props.navigation.navigate('Mapa')}
            source={icAddress}
            resizeMode={'contain'}
            touchableStyle={{
              height: 30,
              width: 30,
              margin: 10,
            }}
          />

          <View style={{flex: 1, backgroundColor: 'red'}}>
            <TextInput
              style={{...INPUT}}
              onSubmitEditing={this.fetchDevices}
              onChangeText={text => this.setState({search: text})}
              textAlign={'center'}
              placeholder="BUSCADOR"
              placeholderTextColor="gray"
              autoCapitalize="none"
            />
          </View>
        </View>
        <FlatList
          nestedScrollEnabled
          style={{flex: 1}}
          data={this.state.dataSource}
          extraData={this.state}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => {
            return <DeviceCard item={item} />;
          }}
          ListFooterComponent={() => (
            <FooterButton
              loading={this.state.Loading}
              onPress={() => this.LoadMore()}
              title="BUSCAR MAS"
            />
          )}
        />
      </View>
    );
  }
}

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

export default WelcomeScreen;

const DeviceCard = props => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: 'gray',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            {props.item.device_name}
          </Text>
          <Text>{props.item.device_model}</Text>
        </View>
        <View style={{flex: 1}}>
          {props.item?.photo ? (
            <ImageView
              style={{height: 50}}
              source={{uri: props.item?.photo}}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const FooterButton = props => {
  return props.loading ? (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 13,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        height: 50,
        width: 200,
      }}>
      <ActivityIndicator
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
        color="black"
        size="small"></ActivityIndicator>
    </View>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 13,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        height: 50,
        width: 200,
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
