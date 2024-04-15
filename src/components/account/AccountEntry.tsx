import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { isBlank, log } from "../../utils/basicUtils";
import AccountWrapper from "../../abstract/AccountWrapper";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import Entry from "../../abstract/AccountEntry";


interface Props extends DefaultProps {
    entry: Entry
}


/**
 * 
 * @since 0.0.1
 */
export default function AccountEntry({entry, ...props}: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "AccountEntry");
    const { amount, note, category, date } = entry;


    function getNote(): JSX.Element {

        if (isBlank(note)) 
            return <BlackText>asdf</BlackText>;
        

        return <BlackText>{note}</BlackText>
    }


    return (
        <View id={id} style={{...style}}>
            <Flex key={getRandomString()} flex="center">
                {/* Amount */}
                <Flex flex="one">
                    <BlackText>{amount}</BlackText>
                </Flex>

                {/* Note */}
                <Flex flex="one">
                    {isBlank(note) ?
                        <BlackText style={{color: "rgb(170, 170, 170)"}}>- No note -</BlackText>:
                        <BlackText>{note}</BlackText>
                    }
                </Flex>

                {/* Category */}
                <Flex flex="one">
                    <BlackText>{category.name}</BlackText>
                </Flex>
            </Flex>

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