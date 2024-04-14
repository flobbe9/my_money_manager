import React, { ReactNode } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import { View } from "react-native";
import { genericStyles } from '../../assets/styles/genericsStyles';


interface Props extends DefaultProps {
    flex: "left" | "center" | "right" | "one" | "two"
}


/**
 * @returns ```<View>{children}</View>``` with flex display and 'justifyContent' set according to given prop
 * @since 0.0.1
 */
export default function Flex({flex, ...otherProps}: Props) {

    const { style, children } = getCleanDefaultProps(otherProps, "Flex");

    const flexStyle = genericStyles["flex" + flex.charAt(0).toUpperCase() + flex.substring(1)];

    
    return (
        <View style={{...style, ...flexStyle}}>
            {children}
        </View>
    )
}