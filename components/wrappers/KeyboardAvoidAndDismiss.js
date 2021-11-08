import React from 'react';
import { Platform, KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';


const KeyboardAvoidAndDismiss = props => {

    return Platform.OS === 'ios' ? 
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <KeyboardAvoidingView behavior='padding' style={{flex:1}} {...props}>
            {props.children}
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    : 
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={{flex:1}}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>
};


export default KeyboardAvoidAndDismiss;