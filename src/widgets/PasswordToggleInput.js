import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import cancelicon from '../assets/icons/eye.png';
import calendaricon from '../assets/icons/hide.png';

export default class PasswordToggleInput extends Component {
  constructor(props) {
    super(props);
    this.state = {secureTextEntry: true, iconName: cancelicon};
  }

  onIconPress = () => {
    let iconName = !this.state.secureTextEntry ? cancelicon : calendaricon;
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
      iconName: iconName,
    });
  };

  render() {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          flexDirection: 'row',
          ...this.props.style,
        }}>
        <TextInput
          {...this.props}
          style={{flex: 1, ...this.props.textStyle}}
          secureTextEntry={this.state.secureTextEntry}
        />

        <TouchableOpacity
          onPress={this.onIconPress}
          style={{alignSelf: 'center', ...this.props.iconStyle}}>
          <Image source={this.state.iconName} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>
    );
  }
}
