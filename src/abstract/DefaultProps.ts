import React from "react";
import { StyleSheet } from "react-native";


/**
 * @since 0.0.1
 */
export default interface DefaultProps {
    id?: string,
    style?: StyleSheet.NamedStyles<any>,
    children?: React.ReactNode
}


export function getCleanDefaultProps<T extends DefaultProps>(props: T): DefaultProps {

    return {
        id: props.id || "",
        ...props
    }
}