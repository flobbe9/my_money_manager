import React from "react";
import { StyleProp, StyleSheet } from "react-native";


/**
 * @since 0.0.1
 */
export default interface DefaultProps {
    id?: string,
    style?: StyleProp<any>,
    children?: React.ReactNode
}


export function getCleanDefaultProps<T extends DefaultProps>(props: T, componentName = ""): DefaultProps {

    return {
        id: componentName + (props.id || ""),
        style: {...props.style},
        children: props.children
    }
}