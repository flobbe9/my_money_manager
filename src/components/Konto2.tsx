import DefaultProps, { getCleanDefaultProps } from "../abstract/DefaultProps";
import React from "react";
import { View, Text } from "react-native";


interface Props extends DefaultProps {

}


export default function Account2(props: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "Account2");


    return (
        <View id={id} style={{...style}}>
            <Text>Konto1</Text>

            {children}
        </View>
    )
}