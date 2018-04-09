import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export function Button(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => props.onPress()}
      disabled={props.saving}
    >
      <Text style={styles.buttonText}>{
        props.saving ? 'Saving' : 'Save'
      }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
