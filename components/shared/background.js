import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const bg_image = require('../../images/bg_image.png');
export default function Background(props) {
  return (
    <ImageBackground source={bg_image} style={[styles.image]}>
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
