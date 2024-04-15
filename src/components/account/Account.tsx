import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import AccountWrapper from "../../abstract/AccountWrapper";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import AccountEntry from "./AccountEntry";
import AlignText from "../helpers/AlignText";
import { sortEntriesByDate, splitEntriesByDate } from "../../abstract/AccountEntry";
import AccountEntryContainer from "./AccountEntryContainer";


interface Props extends DefaultProps {
    wrapper: AccountWrapper
}


export default function Account({wrapper, ...props}: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "Account");
    const { name, total, entries } = wrapper;

    const [accountTotal, setAccountTotal] = useState(0);


    function getAccountTotalStyle(): StyleProp<any> {

        if (accountTotal < 0) 
            return styles.accountTotalMinus;

        if (accountTotal > 0) 
            return styles.accountTotalPlus;

        return {}
    }


    function mapEntries(): JSX.Element[] {

        const accountEntryContainers: JSX.Element[] = [];

        for (const entryGroup of splitEntriesByDate(entries)) 
            accountEntryContainers.push(<AccountEntryContainer key={getRandomString()} entries={entryGroup} />);
        
        return accountEntryContainers;
    }


    return (
        <View id={id} style={{...style}}>
            {/* Total */}
            <Text 
                style={{
                // ...styles.component, 
                ...styles.accountTotal, 
                ...getAccountTotalStyle(),
                ...genericStyles.mb4
                }}
            >
                {accountTotal}
            </Text>

            {/* Entries */}
            {mapEntries()}

            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    component: {
        color: "black"
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