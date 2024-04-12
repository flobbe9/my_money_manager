import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import DefaultProps, { getCleanDefaultProps } from './src/abstract/DefaultProps';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Account1 from './src/components/Konto1';
import Account2 from './src/components/Konto2';
import AccountView from './src/components/AccountView';


export default function App(props: DefaultProps) {

    const { id, style } = getCleanDefaultProps(props);
    const Tab = createMaterialTopTabNavigator();

    return (
        <NavigationContainer>
            <View id={id} style={{...AppStyles.component, ...style}}>
                {/* Top Nav */}
                <Tab.Navigator>
                    <Tab.Screen name="Account1" component={Account1}/>
                    <Tab.Screen name="Account2" component={Account2}/>
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    )
}


export const AppStyles = StyleSheet.create({
    // used by 'getCleanDefaultProps()'
    default: {
        color: "black",
    }, 

    component: {
        flex: 1
    }
});