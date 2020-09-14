import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Background from './shared/background';
import AppModal from './shared/modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  handleCorrectAnswer,
  handleResetCorrectAnswer,
} from '../actions/index';
import AppCard from './shared/card';

class Quiz extends React.Component {
  state = {
    modalVisible: false,
    answer: '',
  };

  handleSetState(answer) {
    this.setState((state) => ({
      modalVisible: !state.modalVisible,
      answer: (state.answer = answer),
    }));
  }

  handleCorrectAnswer(id, answer) {
    this.props.dispatch(handleCorrectAnswer(id, answer));
  }

  handleRestart(id) {
    this.props.dispatch(handleResetCorrectAnswer(id));
    this.props.navigation.navigate('Deck', { deck: this.props.quiz });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const { quiz, navigation } = this.props;
    const { id, cards, correctAnswers } = quiz;

    if (cards.length === 0) {
      return (
        <View
          style={[
            styles.container,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              fontWeight: 'bold',
            },
          ]}
        >
          <Text
            style={{
              fontSize: 24,
              color: '#EF5D65',
              fontWeight: '400',
            }}
          >
            Sorry no question available
          </Text>
        </View>
      );
    }

    return (
      <Background>
        <SafeAreaView>
          <ScrollView
            horizontal={true}
            decelerationRate="fast"
            snapToInterval={width}
          >
            {cards.map((d, i) => (
              <AppCard
                key={i}
                style={{
                  height: height,
                  width: width,
                  padding: 24,
                }}
              >
                <View>
                  <AppModal
                    answer={this.state.answer}
                    modalVisible={this.state.modalVisible}
                    handleSetState={this.handleSetState.bind(this)}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#fff',
                        alignSelf: 'stretch',
                        padding: 24,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{ color: '#999', marginBottom: 8 }}
                      >
                        Question {i + 1}/ {cards.length}{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#434343',
                        }}
                      >
                        {d.question}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          this.handleSetState(d.answer);
                        }}
                      >
                        <Text style={styles.textButton}>
                          Show answer
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleCorrectAnswer(
                            id,
                            `${d.question}__++__${d.answer}`,
                          );
                        }}
                        style={[
                          styles.button,
                          {
                            flex: 1,
                            marginRight: 8,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#8FBF45',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.textButton,
                            { color: '#8FBF45' },
                          ]}
                        >
                          Correct
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            flex: 1,
                            marginRight: 8,
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#8FBF45',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.textButton,
                            { color: '#8FBF45' },
                          ]}
                        >
                          Incorrect
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{ padding: 24, alignItems: 'center' }}
                    >
                      <MaterialCommunityIcons
                        name="gesture-swipe"
                        size={34}
                        color="#8FBF45"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </AppCard>
            ))}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: height,
                width: width,
                padding: 24,
              }}
            >
              <AppCard
                style={{
                  backgroundColor: '#fff',
                  alignSelf: 'stretch',
                  padding: 24,
                  borderRadius: 8,
                }}
              >
                <View style={{ marginBottom: 44 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: '#434343',
                      textAlign: 'center',
                    }}
                  >
                    You Scored {correctAnswers.length}/{cards.length}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: '#8FBF45' },
                  ]}
                  onPress={() => {
                    this.handleRestart(id);
                  }}
                >
                  <Text
                    style={[styles.textButton, { color: '#FFF' }]}
                  >
                    Re-Start
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#fff' }]}
                  onPress={() => navigation.navigate('Decks')}
                >
                  <Text
                    style={[styles.textButton, { color: '#8FBF45' }]}
                  >
                    Back to Decks
                  </Text>
                </TouchableOpacity>
              </AppCard>
            </View>
          </ScrollView>
        </SafeAreaView>
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
  },

  textButton: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
});

const mapStateToProps = ({ decks }, ownProps) => {
  const { deck } = ownProps.route.params;
  return {
    quiz: decks.find((d) => d.id === deck.id),
  };
};

export default connect(mapStateToProps)(Quiz);
