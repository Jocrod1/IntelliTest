import React from 'react';
import {TouchableOpacity} from 'react-native';
import TextView from './Text';

export default function TextButton({
  touchableStyle,
  onPress,
  disabled,
  ...rest
}) {
  return (
    <TouchableOpacity
      style={touchableStyle}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.7}
      onPress={!disabled && onPress}>
      <TextView {...rest} />
    </TouchableOpacity>
  );
}
