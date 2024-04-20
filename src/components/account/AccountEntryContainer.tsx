import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import AccountWrapper from "../../abstract/AccountWrapper";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import Entry from "../../abstract/AccountEntry";
import AccountEntry from "./AccountEntry";
import AlignText from './../helpers/AlignText';


interface Props extends DefaultProps {
    entries: Entry[]
}


/**
 * Holds list of entries of one day.
 * 
 * @since 0.0.1
 */
export default function AccountEntryContainer({entries, ...otherProps}: Props) {

    const { id, style, children } = getCleanDefaultProps(otherProps, "AccountEntryContainer");


    if (!entries.length)
        return <></>;

    return (
        <View id={id} style={{...style, ...styles.component}}>

            <AlignText align="right">
                <BlackText>{entries[0].date.toLocaleDateString()}</BlackText>
            </AlignText>
            
            {entries.map(entry => 
                <AccountEntry key={getRandomString()} entry={entry} />)}

            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    component: {
    },
});