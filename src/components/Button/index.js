import React from 'react';
import { Button as NativeButton } from 'native-base';
import { StyleSheet, Text } from 'react-native';

export function Button(props) {
  return (
    <NativeButton onPress={() => props.onPress()} disabled={props.saving} block>
      <Text style={styles.buttonText}>Save</Text>
    </NativeButton>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white'
  }
});
