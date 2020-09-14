import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderText from './shared/header_01';
import { connect } from 'react-redux';
import { handleDeleteDeck } from '../actions/index';
import Background from './shared/background';
import {
  setLocalNotification,
  clearLocalNotification,
} from '../utils/AppNotification';

class Deck extends React.Component {
  render() {
    const { dispatch, navigation } = this.props;
    const { deck } = this.props.route.params;
    const { name, cards, id } = deck;
    return (
      <Background>
        <View
          style={[
            styles.container,
            { justifyContent: 'space-between' },
          ]}
        >
          <View>
            <HeaderText>{name}</HeaderText>
            <HeaderText style={{ fontSize: 16, color: '#999' }}>
              {cards.length} {cards.length > 1 ? 'cards' : 'card'}
            </HeaderText>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                clearLocalNotification().then(setLocalNotification);
                navigation.navigate('Quiz', { deck });
              }}
            >
              <Text style={styles.textButton}>Quiz</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flex: 1,
                    marginRight: 8,
                    backgroundColor: '#fff',
                  },
                ]}
                onPress={() =>
                  navigation.navigate('New Question', { id })
                }
              >
                <Text
                  style={[styles.textButton, { color: '#8FBF45' }]}
                >
                  New Question
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(handleDeleteDeck(id));
                  navigation.navigate('Decks');
                }}
                style={[
                  styles.button,
                  { flex: 1, marginLeft: 8, backgroundColor: '#fff' },
                ]}
              >
                <Text
                  style={[styles.textButton, { color: '#8FBF45' }]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  button: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#8FBF45',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  textButton: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
});

const mapStateToProps = (state, props) => ({ ...props.route.params });

export default connect(mapStateToProps)(Deck);
