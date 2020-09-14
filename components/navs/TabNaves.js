import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from '../DeckList';
import NewDeck from '../NewDeck';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

class StackNavs extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#8FBF45',
        }}
      >
        <Tab.Screen
          options={{
            tabBarBadge: this.props.decks.length,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="documents" size={size} color={color} />
            ),
          }}
          name="Decks"
          component={DeckList}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="new-message" size={size} color={color} />
            ),
          }}
          name="New Deck"
          component={NewDeck}
        />
      </Tab.Navigator>
    );
  }
}

export default StackNavs;
