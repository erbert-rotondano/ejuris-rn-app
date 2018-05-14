import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={ size || 'large' } color="white" />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F26935',
  }
};

export { Spinner };
