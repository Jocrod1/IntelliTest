import React from 'react';
import {TouchableOpacity} from 'react-native';
import ImageView from './ImageView';

export default (props) => (
  <TouchableOpacity style={props.touchableStyle} onPress={props.onPress}>
    <ImageView
      {...props}
      style={props.style}
      imageStyle={props.imageStyle}
      source={props.source}
    />
  </TouchableOpacity>
);
