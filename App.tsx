import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import DefaultProps, { getCleanDefaultProps } from './src/abstract/DefaultProps';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Konto1 from './src/components/Konto1';
import Konto2 from './src/components/Konto2';


export default function App(props: DefaultProps) {

    const { id, style } = getCleanDefaultProps(props);
    const Tab = createMaterialTopTabNavigator();

    return (
        <View id={id} style={{...styles.App, ...style}}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Konto1" component={Konto1}/>
                    <Tab.Screen name="Konto2" component={Konto2}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
}


const styles = StyleSheet.create({
    App: {
        backgroundColor: "white",
        color: "black",
        flex: 1
    }
});