import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import React, { useState } from "react";
import { View, Text, StyleSheet, StyleProp, Button } from "react-native";
import { genericStyles } from "../../assets/styles/genericsStyles";
import { log } from "../../utils/basicUtils";
import BlackText from "../helpers/BlackText";
import Flex from "../helpers/Flex";
import { getRandomString } from '../../utils/basicUtils';
import { IconStyleProps } from "../../abstract/IconStyleProps";
import VectorIcon from "react-native-vector-icons";


interface Props extends DefaultProps {
    name: string,
    size?: number,
    iconStyle?: IconStyleProps,
    color?: string
}


/**
 * @since 0.0.1
 */
export default function Icon({name, size, color, iconStyle, ...otherProps}: Props) {

    const { id, style, children } = getCleanDefaultProps(otherProps, "Icon");


    return (
        <View id={id} style={{...style, ...styles.component}}>
            <VectorIcon style={iconStyle} name={name} size={size} color={color} />

            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    component: {
    },
});