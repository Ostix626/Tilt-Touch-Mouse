import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
enableScreens();

import { store, persistor } from './store/store';
import DrawerNavigator from './navigation/DrawerNavigatior';

export default function App() {
  return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <DrawerNavigator/>
          </PersistGate>
        </Provider>
      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




