import {Text as RNText, View} from 'react-native';
import React from 'react';

export default function Text({
  style,
  textStyle,
  full,
  numberOfLines,
  text,
  ...rest
}) {
  return (
    <View style={style}>
      <RNText
        {...rest}
        style={textStyle}
        numberOfLines={!full ? numberOfLines || 1 : null}>
        {text}
      </RNText>
    </View>
  );
}
