import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HeaderText from './header_01';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

class AppModal extends React.Component {
  render() {
    const { modalVisible, handleSetState } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                padding: 12,
              }}
              onPress={() => {
                handleSetState();
              }}
            >
              <Ionicons name="ios-close" size={34} color="red" />
            </TouchableOpacity>
            <View
              style={{
                paddingLeft: 34,
                paddingRight: 34,
                paddingBottom: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AntDesign name="like2" size={24} color="black" />
              <HeaderText style={{ color: '#999' }}>
                Correct answer
              </HeaderText>
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                {this.props.answer}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AppModal;
