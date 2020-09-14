import React from 'react';
import { StyleSheet, View } from 'react-native';

function AppCard({ children, style }) {
  return <View style={[styles.card, { ...style }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default AppCard;
