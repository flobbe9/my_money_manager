import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import DefaultProps, { getCleanDefaultProps } from './src/abstract/DefaultProps';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Account from './src/components/account/Account';
import Test from './src/components/Test';
import { clearTimeFromDate, getRandomString } from './src/utils/basicUtils';
import { genericStyles } from './src/assets/styles/genericsStyles';
import AccountWrapper from './src/abstract/account/AccountWrapper';
import AccountEntryWrapper from './src/abstract/account/AccountEntryWrapper';


const testWrappers: AccountWrapper[] = [
    {
        name: "Account1",
        total: 3000,
        entries: [
            {
                amount: 2,
                category: {
                    name: "shopping"
                },
                date: new Date("2024-04-14"),
                created: new Date("2024-04-13T15:40:45.498Z")
            },
            {
                amount: 1,
                category: {
                    name: "Monthly"
                },
                date: new Date("2024-04-14"),
                created: new Date("2024-04-10T15:40:45.498Z")
            },
            {
                amount: 3,
                category: {
                    name: "Monthly"
                },
                date: new Date("2024-04-14"),
                created: new Date("2024-04-16T15:40:45.498Z")
            }
        ]
    },
    {
        name: "Account2",
        total: 3000,
        entries: [
            {
                amount: 3.57,
                category: {
                    name: "Monthly"
                },
                date: new Date("12-31-2000"),
                created: new Date("2023-04-14T15:40:45.498Z")
            }
        ]
    }
]


// TODO: search by
    // amount
    // category
    // note

// TODO: biometrics?
// TODO: offer pin lock
// TODO: turn interfaces into classes
export default function App(props: DefaultProps) {

    const { id, style } = getCleanDefaultProps(props);
    const Tab = createMaterialTopTabNavigator();

    const [accounts, setAccounts] = useState<JSX.Element[]>();


    useEffect(() => {
        // TODO: fetch accounts instead, cache somehow
        setAccounts(testWrappers.map(account => {
            AccountEntryWrapper.sortEntriesByDate(account.entries);

            return (
                <Tab.Screen key={getRandomString()} name={account.name}>
                    {
                        () => <Account 
                                account={account} 
                                entryGroups={getAccountEntryGroups(account)} 
                                />
                    }
                </Tab.Screen>
            )
        }))

    }, []);


    function getAccountEntryGroups(account: AccountWrapper): AccountEntryWrapper[][] {

        return AccountEntryWrapper.splitEntriesByDate(account.entries).map(entryGroup => 
            AccountEntryWrapper.sortEntriesByCreated(entryGroup))
    }


    return (
        <NavigationContainer>
            <View id={id} style={{...styles.container, ...style}}>
                {/* Settings Bar */}
                <Text style={{...genericStyles.mb3, ...genericStyles.textCenter}}>
                    <Text>Some settings</Text> 
                    <Text>More settings</Text>
                </Text>

                {/* Top Nav */}
                <Tab.Navigator>
                    {accounts || <Tab.Screen name={"LoadingScreen"} component={Test} />}
                </Tab.Navigator>
            </View>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    component: {
        color: "black",
    }, 

    container: {
        flex: 1
    },

    settingsBar: {

    }
});