import React, { ReactNode } from "react";
import DefaultProps, { getCleanDefaultProps } from "../../abstract/DefaultProps";
import { Text } from "react-native";


interface Props extends DefaultProps {
}


/**
 * @returns ```<Text>{children}</Text>``` with ```color: "black"``` as style
 * @since 0.0.1
 */
export default function BlackText(props: Props) {

    const { style, children } = getCleanDefaultProps(props, "BlackText");
    
    return (
        <Text style={{color: "black", ...style}}>
            {children}
        </Text>
    )
}