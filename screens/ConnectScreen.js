import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';



const ConnectScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Connect</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default ConnectScreen;