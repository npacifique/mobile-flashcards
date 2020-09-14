import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'capitalize',
  },
});

export default function text(props) {
  return (
    <Text style={[styles.text, props.style]}>{props.children}</Text>
  );
}
