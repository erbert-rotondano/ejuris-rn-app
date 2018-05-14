import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

const ButtonSubmit = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
      <TouchableOpacity onPress={onPress} style={buttonStyle} activeOpacity={0.7}>
        <Text style={textStyle}>
        {children}
        </Text>
      </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonStyle: {
    backgroundColor: '#F26935',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { ButtonSubmit };
