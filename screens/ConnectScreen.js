import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';

import Input from '../components/Input';
import KeyboardAvoidAndDismiss from '../components/wrappers/KeyboardAvoidAndDismiss';
import { setIpAddress } from '../store/actions/serverURL';

var socket

const ConnectScreen = props => {
  const dispatch = useDispatch();
  const SERVER = useSelector(state => state.serverUrl);
  const [serverIP, setServerIP] = useState(SERVER.ip);
  const [status, setStatus] = useState(socket != undefined? socket.connected : false);

  const sendToServer = () => {
    dispatch(setIpAddress(serverIP));
    const url = "http://" + serverIP + ":3001";
    socket = io.connect(url)
    socket.on("connect", () => {
      setStatus(socket != undefined? socket.connected : false)
    });
    setStatus(socket != undefined? socket.connected : false)
  }

  return (
    <View style={styles.container}>
      <Input
        label="IP address:"
        value={serverIP}
        keyboardType="numeric"
        onChangeText={serverIP => setServerIP(serverIP)}
      />
      <Button title="Connect" onPress={sendToServer}></Button>
      <Text>Connected: {status.toString()}</Text>
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