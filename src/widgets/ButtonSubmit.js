import React, {Component} from 'react';
import TextButton from '../../../widgets/TextButton';

class ButtonSubmit extends Component {
  onPress = callback => {
    this.onPressCallback = callback;
  };

  onPressAction = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
    if (this.onPressCallback) {
      this.onPressCallback();
    }
  };

  render() {
    return (
      <TextButton
        text={this.props.text}
        style={this.props.style}
        textStyle={this.props.textStyle}
        onPress={this.onPressAction}
      />
    );
  }
}

export default ButtonSubmitForm;
