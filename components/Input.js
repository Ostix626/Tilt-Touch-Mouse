import React from 'react';
import { TextInput, View, Text, StyleSheet, Platform } from 'react-native';


const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
    // const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={Platform.OS === 'ios'? styles.inputIOS : styles.input}
                value={value}
                onChangeText={onChangeText}
                textAlign="center"
                underlineColorAndroid="grey"
                placeholderTextColor="grey"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '40%',
    },
    input: {
        paddingTop: 2,
        paddingBottom: 18,
        fontSize: 20,
    },
    inputIOS: {
        paddingTop: 18,
        paddingBottom: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: "grey"
    },
    label: {
        fontSize: 16,
        alignSelf: 'center',
        color: "grey"
    },
});

export default Input;

