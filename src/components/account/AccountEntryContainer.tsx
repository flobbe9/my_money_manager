import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import E_AccountEntry from "../../entities/account/E_AccountEntry";
import AccountEntry from "./AccountEntry";
import AlignText from './../helpers/AlignText';
import AccountEntryFilter from "../../abstract/AccountEntryFilter";
import { AccountContext } from "./Account";


interface Props extends DefaultProps {
    entriesOneDay: E_AccountEntry[],
}


/**
 * Holds list of entriesOneDay of one day.
 * 
 * @since 0.0.1
 */
// TODO: apply filter options
    // by note, substring or something
    // by amount
    // by date
export default function AccountEntryContainer({entriesOneDay, ...otherProps}: Props) {

    // case: no entriesOneDay
    if (!entriesOneDay.length)
        return <></>;

    const { id, style, children } = getCleanDefaultProps(otherProps, "AccountEntryContainer");
    const entriesOneDayJSX = mapEntries();
    const [entries, setEntries] = useState<JSX.Element[]>(entriesOneDayJSX);

    const { filters } = useContext(AccountContext);


    useEffect(() => {
        applyFilters();

    }, [filters]);


    function mapEntries(): JSX.Element[] {

        return entriesOneDay.map(entry => 
            <AccountEntry key={getRandomString()} entry={entry} />)
    }


    function applyFilters(): void {

        // category

        setEntries([...AccountEntryFilter.filterByCategory(entriesOneDayJSX, filters)]); ////

        // note

    }

    return (
        <View id={id} style={{...style, ...styles.component}}>

            {/* Date of group */}
            <AlignText align="right">
                <BlackText>{entriesOneDay[0].dateOfExpense.toLocaleDateString()}</BlackText>
            </AlignText>
            
            {/* Entries of group */}
            {entries}

            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    component: {
    },
});