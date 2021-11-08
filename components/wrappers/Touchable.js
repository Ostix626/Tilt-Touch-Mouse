import React from 'react';
import {Platform} from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';


const Touchable = props => {

    return Platform.OS === 'android' ? 
    <TouchableNativeFeedback 
        onPress={props.onPress}
        style={props.style}>
        {props.children}
    </TouchableNativeFeedback>
    : 
    <TouchableOpacity 
        onPress={props.onPress}
        style={props.style}>
        {props.children}
    </TouchableOpacity>
    
};


export default Touchable;