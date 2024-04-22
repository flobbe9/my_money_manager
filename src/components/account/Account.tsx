import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { createContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import E_Account from "../../entities/account/E_Account";
import { getRandomString } from '../../utils/basicUtils';
import AccountEntryContainer from "./AccountEntryContainer";
import AccountEntryFilters from "./filter/AccountEntryFilters";
import E_AccountEntry from "../../entities/account/E_AccountEntry";
import { useRealm } from "@realm/react";
import E_AccountEntryFilter from "../../abstract/AccountEntryFilter";
import AccountEntryFilter from "../../abstract/AccountEntryFilter";
import E_AccountEntryCategory from "../../entities/account/E_AccountEntryCategory";
import Dao from "../../repositories/Dao";


interface Props extends DefaultProps {
    account: E_Account,
    groupedEntries: E_AccountEntry[][]
}


export default function Account({account, groupedEntries, ...props}: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "Account");
    const { total } = account;
    
    // init value is "no filters applied"
    const [filters, setFilters] = useState<AccountEntryFilter>(AccountEntryFilter.getDefaultInstance());
    const [entries, setEntries] = useState<JSX.Element[]>();

    const context = {
        filters
    }

    const realm = useRealm();
    const dao = new Dao(realm);


    useEffect(() => {
        setEntries(mapGroupedEntries());
        
    }, []);


    function getAccountTotalStyle(): StyleProp<any> {

        if (total < 0) 
            return styles.accountTotalMinus;

        if (total > 0) 
            return styles.accountTotalPlus;

        return {}
    }


    /**
     * Sort given account entries into groups by ```date```. Sort entries inside groups by ```created```. Pass filters to components.
     * 
     * @returns array of ```<AccountEntryContainer />```s for each entry group.
     */
    function mapGroupedEntries(): JSX.Element[] {

        const accountEntryContainers: JSX.Element[] = [];

        for (const entriesOneDay of groupedEntries) {
            accountEntryContainers.push(
                <AccountEntryContainer 
                    key={getRandomString()} 
                    entriesOneDay={entriesOneDay} 
                    />
            );
        }
        
        return accountEntryContainers;
    }


    return (
        <AccountContext.Provider value={context}>
            <View id={id} style={{...style}}>
                {/* Total */}
                <Text 
                    style={{
                    ...styles.accountTotal, 
                    ...getAccountTotalStyle(),
                    ...genericStyles.mb4
                    }}
                >
                    {total}
                </Text>

                {/* Filters */}
                <AccountEntryFilters filters={filters} setFilters={setFilters} />

                {/* Entries */}
                {entries}

                {children}
            </View>
        </AccountContext.Provider>
    )
}


const styles = StyleSheet.create({
    component: {
    },

    accountTotal: {
        fontSize: 30,
        ...genericStyles.textCenter,
        ...genericStyles.mt4,
        color: "black"
    },

    accountTotalPlus: {
        color: "green"
    },
    accountTotalMinus: {
        color: "red"
    }
});


export const AccountContext = createContext({
    filters: AccountEntryFilter.getDefaultInstance()
})