import React from 'react';
import PropTypes from 'prop-types';
import { Button as NativeButton } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default function Button(props) {
  return (
    <NativeButton onPress={() => props.onPress()} disabled={props.savingIdea} block>
      <Text style={styles.buttonText}>Save</Text>
    </NativeButton>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  savingIdea: PropTypes.bool.isRequired,
};
