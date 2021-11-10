import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';

import {store} from '../store/store';
import Touchable from '../components/wrappers/Touchable';
import { DrawerContentScrollView } from '@react-navigation/drawer';

// const socket = io.connect("http://192.168.1.110:3001");

// const state = store.getState();

// const url = state.serverUrl.baseUrl
// console.log(url)
// const socket = io.connect(url);

var socket 

const TiltScreen = props => {
  const SERVER = useSelector(state => state.serverUrl);
  useEffect(() => {
    if(socket == undefined || !socket.connected) {
      socket = io.connect(SERVER.baseUrl)
    }
  }, [])


  const [click, setClick] = useState(false)
  // TOUCH
  const [touchData, setTouchData] = useState({
    dx: 0, // accumulated distance of the gesture since the touch started
    dy: 0, // accumulated distance of the gesture since the touch started
    moveX: 0, // the latest screen coordinates of the recently-moved touch
    moveY: 0, // the latest screen coordinates of the recently-moved touch
    numberActiveTouches: 0,
    stateID: 0, // ID of the gestureState- persisted as long as there's at least one touch on screen
    vx: 0, // current velocity of the gesture
    vy: 0, // current velocity of the gesture
    x0: 0, // the screen coordinates of the responder grant
    y0: 0, // the screen coordinates of the responder grant
  })

  //ACCELERATOR
  const [accData, setAccData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscriptionAcc, setSubscriptionAcc] = useState(null);

  Accelerometer.setUpdateInterval(16);

  const _subscribeAcc = () => {
    setSubscriptionAcc(
      Accelerometer.addListener(accelerometerData => {
        setAccData(accelerometerData);
      })
    );
  };

  const _unsubscribeAcc = () => {
    subscriptionAcc && subscriptionAcc.remove();
    setSubscriptionAcc(null);
    setAccData({x: 0, y: 0, z: 0})
  };

  useEffect(() => {
    _subscribeAcc();
    return () => _unsubscribeAcc();
  }, []);

  //GYROSCOPE
  const [gyroData, setGyroData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  
  const [subscriptionGyro, setSubscriptionGyro] = useState(null);

  Gyroscope.setUpdateInterval(20);
  
  const _subscribeGyro = () => {
    setSubscriptionGyro(
      Gyroscope.addListener(gyroscopeData => {
        setGyroData(gyroscopeData);
      })
    );
  };
  
  const _unsubscribeGyro = () => {
    subscriptionGyro && subscriptionGyro.remove();
    setSubscriptionGyro(null);
    setGyroData({x: 0, y: 0, z: 0})
  };
  
  useEffect(() => {
    _subscribeGyro();
    return () => _unsubscribeGyro();
  }, []);

  
  
  useEffect(() => {
    const data = {
      "click": click,
      "touch": touchData,
      "gyro": gyroData,
      "acc": accData
    }
    socket.emit("test", data);
    if (click) setClick(false);
  }, [accData, gyroData, click])

  return (
    <View style={styles.container}>
      <Touchable style={styles.touchable} onPressIn={() => setClick(true)}>
        {/* <View style={styles.container}> */}
          <Text style={styles.text}>
            Gyroscope: {"\n"} {"\n"}
            x: {gyroData.x.toFixed(2)} {"\n"}
            y: {gyroData.y.toFixed(2)} {"\n"}
            z: {gyroData.z.toFixed(2)} {"\n"} {"\n"} {"\n"}

            Accelerometer: {"\n"} {"\n"}
            x: {accData.x.toFixed(2)} {"\n"}
            y: {accData.y.toFixed(2)} {"\n"}
            z: {accData.z.toFixed(2)}
          </Text>
          
        {/* </View> */}
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    
  },
  clickArea: {
    flex: 1,
  },
  touchable: {
    // backgroundColor: 'grey',
    alignItems: 'center',
    height: '100%',
    // top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'space-evenly', 
    // padding: 80
  },


});

export default TiltScreen;