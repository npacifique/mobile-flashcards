import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderText from './shared/header_01';
import Background from './shared/background';
import AppCard from './shared/card';

class DeckList extends React.Component {
  render() {
    const { navigation, decks } = this.props;
    const data = decks;

    if (data.length === 0) {
      return (
        <Background>
          <View
            style={[
              styles.container,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              },
            ]}
          >
            <Text
              style={{
                fontSize: 24,
                color: '#EF5D65',
                fontWeight: 'bold',
              }}
            >
              Sorry no question available
            </Text>
          </View>
        </Background>
      );
    }

    return (
      <Background>
        <AppCard style={styles.container}>
          <SafeAreaView>
            <FlatList
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    marginBottom: 12,
                    padding: 12,
                    borderRadius: 8,
                  }}
                  onPress={() =>
                    navigation.navigate('Deck', { deck: item })
                  }
                >
                  <HeaderText
                    style={{ marginBottom: 8, color: '#434343' }}
                  >
                    {item.name}
                  </HeaderText>
                  <HeaderText
                    style={{
                      fontSize: 16,
                      color: '#999',
                      marginBottom: 4,
                    }}
                  >
                    {item.cards.length}{' '}
                    {item.cards.length > 1 ? 'cards' : 'card'}
                  </HeaderText>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </AppCard>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

const mapStateToProps = ({ decks }) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(DeckList);
