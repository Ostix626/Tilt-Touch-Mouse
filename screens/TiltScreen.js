import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Touchable from '../components/wrappers/Touchable';

const TiltScreen = props => {

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
      <Touchable style={styles.touchable} >
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