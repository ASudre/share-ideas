// @flow

import React from 'react';
import { Button as NativeButton } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

type Props = {
  onPress: () => void,
  savingIdea: boolean,
  text: string,
};

export default function Button(props: Props) {
  return (
    <NativeButton onPress={() => props.onPress()} disabled={props.savingIdea} block>
      <Text style={styles.buttonText}>{props.text}</Text>
    </NativeButton>
  );
}
