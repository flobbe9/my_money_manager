import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DefaultProps, { getCleanDefaultProps } from './src/abstract/DefaultProps';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Account from './src/components/account/Account';
import Test from './src/components/Test';
import { getRandomString, log } from './src/utils/basicUtils';
import { genericStyles } from './src/assets/styles/genericsStyles';
import E_Account from './src/entities/account/E_Account';
import E_AccountEntry from './src/entities/account/E_AccountEntry';
import { useMockData } from './src/hooks/useMockData';
import { Results } from 'realm';
import { useQuery, useRealm } from '@realm/react';
import Dao from './src/repositories/Dao';


// TODO: search by
    // amount
    // category
    // note

// TODO: biometrics?
// TODO: offer pin lock
// TODO: turn interfaces into classes
/**
 * Structure:
 * ```
 * <App>
 *      TODO
 * </App>
 */
export default function App(props: DefaultProps) {

    const { id, style } = getCleanDefaultProps(props);

    const Tab = createMaterialTopTabNavigator();

    const [accounts, setAccounts] = useState<JSX.Element[]>();

    const realm = useRealm();
    // TODO: do this only in dev env
    const mockData = useMockData(realm);
    const dao = new Dao(realm);


    useEffect(() => {
        // TODO: fetch accounts instead, cache somehow
        setAccounts(mapAccounts());

    }, []);


    function mapAccounts(): JSX.Element[] {

        return mockData.map(account => {
            return (
                <Tab.Screen key={getRandomString()} name={account.name}>
                    {
                        () => <Account 
                                account={account} 
                                groupedEntries={groupAccountEntries(account)} 
                                />
                    }
                </Tab.Screen>
            )
        })
    }


    function groupAccountEntries(account: E_Account): E_AccountEntry[][] {

        return account.splitEntriesByDate()
                      .map(entryGroup => 
                        E_Account.sortEntriesByCreatedReturnArray((entryGroup)))
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
                    {(accounts && accounts.length) ? accounts : <Tab.Screen name={"LoadingScreen"} component={Test} />}
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
})