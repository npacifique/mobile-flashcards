import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewQuestion from '../NewQuestion';
import TabNaves from './TabNaves';
import Deck from '../Deck';
import Quiz from '../Quiz';
import { connect } from 'react-redux';
const Stack = createStackNavigator();

class StackNavs extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8FBF45',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="Decks"
          children={() => <TabNaves decks={this.props.decks} />}
        />
        <Stack.Screen name="Deck" component={Deck} />
        <Stack.Screen name="New Question" component={NewQuestion} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(StackNavs);
