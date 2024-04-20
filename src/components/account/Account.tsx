import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import AccountWrapper from "../../abstract/account/AccountWrapper";
import BlackText from "../helpers/BlackText";
import { getRandomString } from '../../utils/basicUtils';
import AccountEntryContainer from "./AccountEntryContainer";
import AccountEntryFilterWrapper from "../../abstract/account/AccountEntryFilterWrapper";
import Checkbox from "expo-checkbox";
import AccountEntryFilters from "./filter/AccountEntryFilters";
import CheckboxNoState from "../helpers/CheckboxNoState";
import AccountEntryWrapper from "../../abstract/account/AccountEntryWrapper";


interface Props extends DefaultProps {
    account: AccountWrapper,
    entryGroups: AccountEntryWrapper[][]
}


export default function Account({account, entryGroups, ...props}: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "Account");
    const { total } = account;

    const [filters, setFilters] = useState<AccountEntryFilterWrapper>(AccountEntryFilterWrapper.getDefaultInstance());
    const [entries, setEntries] = useState<JSX.Element[]>();


    useEffect(() => {
        setEntries(mapEntryGroups());

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
    function mapEntryGroups(): JSX.Element[] {

        const accountEntryContainers: JSX.Element[] = [];

        for (const entryGroup of entryGroups) {
            accountEntryContainers.push(
                <AccountEntryContainer 
                    key={getRandomString()} 
                    entryGroup={entryGroup} 
                    filters={filters}
                    />
            );
        }
        
        return accountEntryContainers;
    }


    return (
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