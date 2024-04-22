import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { isBlank, log } from "../../utils/basicUtils";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import E_AccountEntry from "../../entities/account/E_AccountEntry";


interface Props extends DefaultProps {
    entry: E_AccountEntry
}


/**
 * 
 * @since 0.0.1
 */
export default function AccountEntry({entry, ...props}: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "AccountEntry");
    const { amount, note, category } = entry;


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