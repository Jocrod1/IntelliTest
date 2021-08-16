import React from 'react';
import {View, Image} from 'react-native';

export default props => (
  <View style={props.style}>
    <Image
      {...props}
      style={{
        borderRadius: props.borderRadius || 0,
        width: '100%',
        height: '100%',
        ...props.imageStyle,
      }}
      source={props.source}
      resizeMode={props.resizeMode || 'cover'}
    />
    {props.render}
  </View>
);
