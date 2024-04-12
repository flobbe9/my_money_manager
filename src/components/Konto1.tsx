import DefaultProps, { getCleanDefaultProps } from "../abstract/DefaultProps";
import React from "react";
import { View, Text } from "react-native";
import AccountView from "./AccountView";


interface Props extends DefaultProps {

}


export default function Account1(props: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "Account1");


    return (
        <View id={id} style={{...style}}>
            <AccountView />

            {children}
        </View>
    )
}