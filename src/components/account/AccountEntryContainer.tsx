import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import AccountEntryWrapper from "../../abstract/account/AccountEntryWrapper";
import AccountEntry from "./AccountEntry";
import AlignText from './../helpers/AlignText';
import AccountEntryFilterWrapper from "../../abstract/account/AccountEntryFilterWrapper";


interface Props extends DefaultProps {
    entryGroup: AccountEntryWrapper[],
    filters?: AccountEntryFilterWrapper
}


/**
 * Holds list of entryGroup of one day.
 * 
 * @since 0.0.1
 */
// TODO: apply filter options
    // by note, substring or something
    // by amount
    // by date
export default function AccountEntryContainer({entryGroup, filters, ...otherProps}: Props) {

    // case: no entryGroup
    if (!entryGroup.length)
        return <></>;

    const { id, style, children } = getCleanDefaultProps(otherProps, "AccountEntryContainer");
    const [entries, setEntries] = useState<JSX.Element[]>([]);


    useEffect(() => {
        setEntries(mapEntries())
        
    }, []);
    
    
    // TODO: not called on change
    useEffect(() => {
        log("filter")
        applyFilters();

    }, [filters]);


    function mapEntries(): JSX.Element[] {

        return entryGroup.map(entry => 
            <AccountEntry key={getRandomString()} entry={entry} />)
    }


    function applyFilters(): void {

        let filteredEntries: AccountEntryWrapper[] = [];

        // category

        // TODO: does not work
        setEntries(AccountEntryFilterWrapper.filterByCategory(entries, filters)); ////

        // note

        

        // return filteredEntries;
    }


    return (
        <View id={id} style={{...style, ...styles.component}}>

            {/* Date of group */}
            <AlignText align="right">
                <BlackText>{entryGroup[0].date.toLocaleDateString()}</BlackText>
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