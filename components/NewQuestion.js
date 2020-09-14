import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/index';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import HeaderText from './shared/header_01';
import Background from './shared/background';

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
  }

  handleCreateQuestion(id, cb) {
    this.props.dispatch(handleAddQuestion(id, this.state));
    this.props.navigation.navigate('Decks');
  }
  render() {
    const { navigation, deck } = this.props;
    const { id } = deck;

    return (
      <Background>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container]}>
              <View
                style={{ flex: 1, justifyContent: 'space-evenly' }}
              >
                <View
                  style={{
                    padding: 18,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                  }}
                >
                  <HeaderText>
                    {`New card that contain a question & answer `}
                  </HeaderText>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={[styles.input, { marginBottom: 12 }]}
                    placeholder="Question"
                    onChangeText={(text) =>
                      this.setState({ question: text })
                    }
                    value={this.state.question}
                  />
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={[styles.input, { marginBottom: 12 }]}
                    placeholder="Answer"
                    onChangeText={(text) =>
                      this.setState({ answer: text })
                    }
                    value={this.state.answer}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleCreateQuestion(id)}
                  >
                    <Text style={styles.textButton}>Submit</Text>
                  </TouchableOpacity>
                </View>
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
    marginBottom: 24,
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

const mapStateToProps = (state, props) => {
  const { id } = { ...props.route.params };
  return {
    deck: state.decks.find((d) => d.id === id),
  };
};

export default connect(mapStateToProps)(NewQuestion);
