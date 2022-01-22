import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, PanResponder } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';


import Touchable from '../components/wrappers/Touchable';

var socket 

const TouchScreen = props => {
  const SERVER = useSelector(state => state.serverUrl);
  useEffect(() => {
    if(socket == undefined || !socket.connected) {
      socket = io.connect(SERVER.baseUrl)
    }
  }, [])


  //ACCELERATOR
  const [accData, setAccData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [triggerData, setTriggerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscriptionAcc, setSubscriptionAcc] = useState(null);

  Accelerometer.setUpdateInterval(21);

  const _subscribeAcc = () => {
    setSubscriptionAcc(
      Accelerometer.addListener(accelerometerData => {
        setTriggerData(accelerometerData);
      })
    );
  };

  const _unsubscribeAcc = () => {
    subscriptionAcc && subscriptionAcc.remove();
    setSubscriptionAcc(null);
    setTriggerData({x: 0, y: 0, z: 0})
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

  const [triggerData2, setTriggerData2] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscriptionGyro, setSubscriptionGyro] = useState(null);

  Gyroscope.setUpdateInterval(16);
  
  const _subscribeGyro = () => {
    setSubscriptionGyro(
      Gyroscope.addListener(gyroscopeData => {
        setTriggerData2(gyroscopeData);
      })
    );
  };
  
  const _unsubscribeGyro = () => {
    subscriptionGyro && subscriptionGyro.remove();
    setSubscriptionGyro(null);
    setTriggerData2({x: 0, y: 0, z: 0})
  };
  
  useEffect(() => {
    _subscribeGyro();
    return () => _unsubscribeGyro();
  }, []);


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

  const [subscriptionTouch, setSubscriptionTouch] = useState(true);
  const _unsubscribeTouch = () => setSubscriptionTouch(false);
  const _subscribeTouch = () => setSubscriptionTouch(true);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
        setTouchData(gestureState)
        setTouchData({
          ...touchData,
          dx: gestureState.dx,
          dy: gestureState.dy,
          moveX: gestureState.moveX,
          moveY: gestureState.moveY,
          numberActiveTouches: gestureState.numberActiveTouches,
          stateID: gestureState.stateID,
          vx: gestureState.vx,
          vy: gestureState.vy,
          x0: gestureState.x0,
          y0: gestureState.y0,
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        setTouchData(gestureState)
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    })
  ).current;

  useEffect(() => {
    const data = {
      "click": click,
      "touch": touchData,
      "gyro": gyroData,
      "acc": accData
    }
    socket.emit("data", data);
    if (click) setClick(false);
  }, [touchData, click, triggerData, triggerData2 ])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container} {...subscriptionTouch? {...panResponder.panHandlers} : null}>
      </View>
      <Touchable style={styles.button} onPressIn={() => setClick(true)}>
        <Text>CLICK</Text>
      </Touchable>
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
  button: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 18,
  }
});

export default TouchScreen;