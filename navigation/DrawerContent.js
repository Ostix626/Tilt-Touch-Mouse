import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer'


import Colors from '../constants/Colors';
import DrawerItem from '../components/DrawerItem';

const DrawerContent = props => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>

                <View style={styles.drawerContent}>
                

                    <View style={styles.mainDrawerSection}>
                        <DrawerItem text='Connect' 
                            onTap={() => props.navigation.navigate('ConnectScreen')}/>
                        
                        <DrawerItem text='Tilt' 
                            onTap={() => props.navigation.navigate('TiltScreen')}/>
                        
                        <DrawerItem text='Touch' 
                            onTap={() => props.navigation.navigate('TouchScreen')}/>
                        
                        <DrawerItem text='Tilt and touch' 
                            onTap={() => props.navigation.navigate('TiltAndTouchScreen')}/>

                        <DrawerItem text='Custom' 
                            style={styles.item}
                            onTap={() => props.navigation.navigate('CustomScreen')}/>
                    </View>
                    
                
                </View>

                
            </DrawerContentScrollView>
        </View>
    );
} 

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    itemText: {
        fontWeight: 'bold', 
        color: "#000000"
    },
  
});

export default DrawerContent;