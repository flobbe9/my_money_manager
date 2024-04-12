import DefaultProps, { getCleanDefaultProps } from "../abstract/DefaultProps";
import React, { useState } from "react";
import { View, Text, StyleSheet, StyleProp } from "react-native";
import { genericStyles } from "../assets/styles/genericsStyles";
import { AppStyles } from "../../App";


interface Props extends DefaultProps {

}


export default function AccountView(props: Props) {

    const { id, style, children } = getCleanDefaultProps(props, "AccountView");

    const [accountTotal, setAccountTotal] = useState(0);


    function getAccountTotalStyle(): StyleProp<any> {

        let accountStyle = {
            ...styles.component, 
            ...styles.accountTotal, 
            ...style
        };

        if (accountTotal < 0) 
            Object.assign(accountStyle, styles.accountTotalMinus);

        if (accountTotal > 0) 
            Object.assign(accountStyle, styles.accountTotalPlus);
            
        return accountStyle;
    }


    return (
        <View id={id} style={{...style}}>
            {/* Total */}
            <Text style={getAccountTotalStyle()}>{accountTotal}</Text>

            {/* Expenses list */}

            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    component: {
    },

    accountTotal: {
        fontSize: 30,
        ...genericStyles.textCenter,
        ...genericStyles.mt4
    },

    accountTotalPlus: {
        color: "green"
    },
    accountTotalMinus: {
        color: "red"
    }
});