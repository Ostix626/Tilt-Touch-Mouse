import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import ConnectScreen from '../screens/ConnectScreen';
import TiltScreen from '../screens/TiltScreen';
import TouchScreen from '../screens/TouchScreen';
import TiltAndTouchScreen from '../screens/TiltAndTouchScreen';
import CustomScreen from '../screens/CustomScreen';

import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="ConnectScreen" 
                
                drawerContent={props => <DrawerContent {...props}/> } 


                screenOptions={{
                    drawerStyle: {width: 150,},
                    unmountInactiveRoutes: true,
                    unmountOnBlur: true
                }}>

                <Drawer.Screen name="ConnectScreen" component={ConnectScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="TiltScreen" component={TiltScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="TouchScreen" component={TouchScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="TiltAndTouchScreen" component={TiltAndTouchScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="CustomScreen" component={CustomScreen} options={{headerShown: false}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigator;
