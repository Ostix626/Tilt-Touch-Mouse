import React from 'react';
import {Image, Text, StyleSheet, Platform} from 'react-native';
import { TouchableOpacity, TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';

import Touchable from './wrappers/Touchable';

const DrawerItem = props => {

    return (
        <Touchable style={styles.item} onPress = {props.onTap}>  
        { props.imgSrc == undefined ? null : 
            <Image source={props.imgSrc}
                style={{height: 24, width: 24, marginLeft: 4, marginRight: 28}} />}
            <Text style={styles.itemText}>{props.text}</Text>
        </Touchable>
    );

    
};

const styles = StyleSheet.create ({
    itemText: {
        fontWeight: 'bold', 
        color: "#000000",
        paddingLeft: 0,
        textAlignVertical: "center"
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 17,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

});

export default DrawerItem;
