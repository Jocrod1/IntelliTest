import {Platform} from 'react-native';
import color from './colors';

const alignCenter = {
  alignItems: 'center',
};
const debug = {
  borderColor: 'black',
  borderWidth: 1,
};

const height = 35;

const MATCH_PARENT = {
  width: '100%',
  height: '100%',
};

const CENTER = {
  alignItems: 'center',
  justifyContent: 'center',
};

const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2,
};

const BOLD = {
  fontWeight: 'bold',
};

const SUBMIT_BUTTON_CONTAINER = {
  backgroundColor: color.blue,
  ...CENTER,
  borderRadius: 8,
  height: 40,
  minWidth: '50%',
  alignSelf: 'center',
};

const OVAL_BUTTON_CONTAINER = {
  alignSelf: 'center',
  backgroundColor: color.accent,
  color: 'blue',
  height,
  borderRadius: 20,
  minWidth: '80%',
  paddingHorizontal: 8,
  ...CENTER,
};

const OVAL_BUTTON_TEXT = {
  color: 'white',
};

const INPUT = {
  borderWidth: 1,
  backgroundColor: color.white,
  color: color.black,
  paddingHorizontal: 8,
  borderColor: 'gray',
};

const MENU = {
  backgroundColor: 'white',
  padding: 8,
  borderRadius: 4,
  ...SHADOW,
};

const CARD = {
  margin: 8,
  padding: 8,
  borderRadius: 8,
  backgroundColor: color.white,
  ...SHADOW,
};

const FONT_MEDIUM = Platform.select({
  android: {fontFamily: 'sans-serif-medium'},
  default: {fontWeight: '500'},
});

export {
  alignCenter,
  debug,
  MATCH_PARENT,
  CENTER,
  SHADOW,
  BOLD,
  OVAL_BUTTON_CONTAINER,
  OVAL_BUTTON_TEXT,
  INPUT,
  SUBMIT_BUTTON_CONTAINER,
  MENU,
  CARD,
  FONT_MEDIUM,
};
