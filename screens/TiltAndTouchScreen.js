import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, PanResponder } from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Touchable from '../components/wrappers/Touchable';

const TiltAndTouchScreen = props => {

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
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
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
        
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        setTouchData(gestureState)

        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;
  

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
  

  return (
    <View style={styles.container}>
            <View style={styles.touchpad} {...subscriptionTouch? {...panResponder.panHandlers} : null}>
          <View style={styles.sensorInfo}>
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
            
            <Text style={styles.text}>
              Touch: {"\n"}{"\n"}
              dx: {touchData.dx} {"\n"}
              dy: {touchData.dy} {"\n"}
              moveX: {touchData.moveX} {"\n"}
              moveY: {touchData.moveY} {"\n"}
              numberActiveTouches: {touchData.numberActiveTouches} {"\n"}
              stateID: {touchData.stateID} {"\n"}
              vx: {touchData.vx} {"\n"}
              vy: {touchData.vy} {"\n"}
              x0: {touchData.x0} {"\n"}
              y0: {touchData.y0} 
            </Text>
          </View>
      </View>
      <Touchable style={styles.button}>
        <Text>CLICK</Text>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 16
  },
  touchpad: {
    flex: 1,
    backgroundColor: 'white'
  },
  sensorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 36
  },  
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 18,
    // height: 50
  }

});

export default TiltAndTouchScreen;