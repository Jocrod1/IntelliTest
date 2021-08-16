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
  Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        this.setState({initialPosition: initialRegion});
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 15000},
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1, margin: 10}}
          initialRegion={this.state.initialPosition}>
          <Marker coordinate={this.state.initialPosition} />
        </MapView>
      </View>
    );
  }
}

export default MapComponent;
