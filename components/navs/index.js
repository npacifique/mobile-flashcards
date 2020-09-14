//import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavs from './StackNavs';

class Navs extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StackNavs />
      </NavigationContainer>
    );
  }
}

export default Navs;
