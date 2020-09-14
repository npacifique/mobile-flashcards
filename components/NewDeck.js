import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import HeaderText from './shared/header_01';
import { handleAddDecks } from '../actions/index';
import Background from './shared/background';
import FormatCard from '../utils/cardFormat';

class NewDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleCreateDeck = this.handleCreateDeck.bind(this);
  }

  handleCreateDeck(dispatch, navigation) {
    dispatch(handleAddDecks(FormatCard(this.state.name)));
    navigation.navigate('Decks');
    this.setState({ name: '' });
  }

  render() {
    const { navigation, dispatch } = this.props;
    return (
      <Background>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  justifyContent: 'flex-end',
                  padding: 24,
                  borderRadius: 8,
                }}
              >
                <HeaderText>
                    What would you like to name your Deck?
                </HeaderText>
                <TextInput
                  style={[styles.input, { marginBottom: 12 }]}
                  placeholder="Deck name"
                  onChangeText={(text) =>
                    this.setState({ name: text })
                  }
                  value={this.state.name}
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.handleCreateDeck(dispatch, navigation);
                  }}
                >
                  <Text style={styles.textButton}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  input: {
    borderBottomColor: '#D2D6E4',
    borderBottomWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 12,
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

export default connect()(NewDeck);
