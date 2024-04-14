import React, { ReactNode } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import { Text } from "react-native";
import { genericStyles } from '../../assets/styles/genericsStyles';


interface Props extends DefaultProps {
    align: "left" | "center" | "right"
}


/**
 * @returns ```<Text>{children}</Text>``` with 'textAlign' set to given prop
 * @since 0.0.1
 */
export default function AlignText({align, ...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "AlignText");

    const flexStyle = genericStyles["text" + align.charAt(0).toUpperCase() + align.substring(1)];

    
    return (
        <Text style={{...style, ...flexStyle}}>
            {children}
        </Text>
    )
}